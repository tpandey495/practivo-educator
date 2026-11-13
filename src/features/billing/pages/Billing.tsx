import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import {
  CreditTransactionType,
  useGetCreditPacksQuery,
  useGetCreditTransactionsQuery,
} from "../api/billingApi";
import { useCredits } from "../hooks/useCredits";
import CreditUsageBar from "../components/CreditUsageBar";
import BuyCreditsModal, { formatPrice } from "../components/BuyCreditsModal";

const cardSx = { p: { xs: 2, md: 3 }, borderRadius: 3, border: "1px solid #e5e7eb" };

/** Readable labels for backend operation keys */
const OPERATION_LABELS: Record<string, string> = {
  INITIAL_GRANT: "Welcome credits",
  COURSE_OUTLINE: "Course outline",
  COURSE_WITH_QUESTIONS: "Course with questions",
  PLAYLIST_WITHOUT_QUESTIONS: "Course from YouTube",
  PLAYLIST_WITH_QUESTIONS: "Course from YouTube with questions",
  CHAPTER_GENERATION: "Chapter",
  LESSON_GENERATION: "Lesson",
  CONTENT_TYPE_QUIZ: "Quiz",
  SINGLE_QUESTION: "Single question",
  FIVE_MCQS: "Questions",
  QUESTION_GENERATION: "Questions",
};

const operationLabel = (op: string) =>
  OPERATION_LABELS[op] ??
  op.toLowerCase().replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());

const TYPE_STYLE: Record<CreditTransactionType, { label: string; color: string; bg: string; sign: string }> = {
  CREDIT: { label: "Credit", color: "#047857", bg: "#ECFDF5", sign: "+" },
  REFUND: { label: "Refund", color: "#0369A1", bg: "#F0F9FF", sign: "+" },
  DEBIT: { label: "Debit", color: "#B91C1C", bg: "#FEF2F2", sign: "−" },
};

const StatTile = ({ label, value }: { label: string; value?: number }) => (
  <Box sx={{ p: 2, borderRadius: 2, bgcolor: "#F8FAFC", border: "1px solid #E2E8F0" }}>
    <Typography variant="caption" color="text.secondary" fontWeight={500}>
      {label}
    </Typography>
    <Typography fontWeight={800} fontSize={24} sx={{ fontVariantNumeric: "tabular-nums" }}>
      {value === undefined ? "—" : value.toLocaleString()}
    </Typography>
  </Box>
);

const Billing = () => {
  const [buyOpen, setBuyOpen] = useState(false);
  const [page, setPage] = useState(0); // zero-based for MUI
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const { wallet } = useCredits();
  const { data: packs } = useGetCreditPacksQuery();
  const {
    data: txPage,
    isLoading: txLoading,
    isFetching: txFetching,
    isError: txError,
  } = useGetCreditTransactionsQuery({ page: page + 1, limit: rowsPerPage });

  const transactions = txPage?.items ?? [];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333" }}>
        Billing & Credits
      </Typography>

      {/* Wallet */}
      <Paper elevation={0} sx={cardSx}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2, mb: 2, flexWrap: "wrap" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AutoAwesomeIcon sx={{ color: "#4F39F6" }} />
            <Typography variant="h6" fontWeight={700}>
              AI credits
            </Typography>
          </Box>
          <Button
            variant="contained"
            onClick={() => setBuyOpen(true)}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
              background: "linear-gradient(135deg, #4F39F6 0%, #8B5CF6 100%)",
            }}
          >
            Buy credits
          </Button>
        </Box>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" }, gap: 1.5, mb: 2 }}>
          <StatTile label="Available" value={wallet?.balance} />
          <StatTile label="Total credited" value={wallet?.totalCredited} />
          <StatTile label="Total used" value={wallet?.totalConsumed} />
        </Box>
        <CreditUsageBar />
      </Paper>

      {/* Packs */}
      <Paper elevation={0} sx={cardSx}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
          Credit packs
        </Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" }, gap: 2 }}>
          {packs?.map((pack) => (
            <Box key={pack.id} sx={{ p: 2, borderRadius: 2, border: "1px solid #E2E8F0", position: "relative" }}>
              {pack.popular && (
                <Chip label="Popular" size="small" sx={{ position: "absolute", top: 12, right: 12, bgcolor: "#EEF2FF", color: "#4338CA", fontWeight: 600 }} />
              )}
              <Typography fontWeight={600}>{pack.name}</Typography>
              <Typography fontWeight={800} fontSize={24}>
                {pack.credits.toLocaleString()} <Typography component="span" fontSize={13} color="text.secondary">credits</Typography>
              </Typography>
              <Typography color="#4F39F6" fontWeight={600} sx={{ mb: 1 }}>
                {formatPrice(pack)}
              </Typography>
              <Button size="small" variant="outlined" onClick={() => setBuyOpen(true)} sx={{ textTransform: "none", borderRadius: 2 }}>
                Select
              </Button>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Usage history */}
      <Paper elevation={0} sx={cardSx}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Typography variant="h6" fontWeight={700}>
            Usage history
          </Typography>
          {txFetching && !txLoading && <CircularProgress size={16} />}
        </Box>

        {txLoading ? (
          <CircularProgress size={24} />
        ) : txError ? (
          <Alert severity="error">Couldn't load your credit history.</Alert>
        ) : transactions.length === 0 ? (
          <Typography color="text.secondary">No credit activity yet.</Typography>
        ) : (
          <>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Activity</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell align="right">Credits</TableCell>
                    <TableCell align="right">Balance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((tx) => {
                    const style = TYPE_STYLE[tx.type] ?? TYPE_STYLE.DEBIT;
                    return (
                      <TableRow key={tx.id}>
                        <TableCell sx={{ whiteSpace: "nowrap" }}>{new Date(tx.createdAt).toLocaleString()}</TableCell>
                        <TableCell>{operationLabel(tx.operation)}</TableCell>
                        <TableCell>
                          <Chip
                            label={style.label}
                            size="small"
                            sx={{ height: 22, fontSize: 11, fontWeight: 600, color: style.color, bgcolor: style.bg }}
                          />
                        </TableCell>
                        <TableCell align="right" sx={{ color: style.color, fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
                          {style.sign}
                          {Math.abs(tx.amount).toLocaleString()}
                        </TableCell>
                        <TableCell align="right" sx={{ fontVariantNumeric: "tabular-nums" }}>
                          {tx.balanceAfter.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={txPage?.total ?? 0}
              page={page}
              onPageChange={(_, p) => setPage(p)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
              rowsPerPageOptions={[10, 20, 50, 100]}
            />
          </>
        )}
      </Paper>

      <BuyCreditsModal open={buyOpen} onClose={() => setBuyOpen(false)} />
    </Box>
  );
};

export default Billing;
