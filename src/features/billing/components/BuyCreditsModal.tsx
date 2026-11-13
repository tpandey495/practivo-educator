import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import {
  CreditPack,
  useGetCreditPacksQuery,
  usePurchaseCreditsMutation,
} from "../api/billingApi";
import CreditUsageBar from "./CreditUsageBar";

interface BuyCreditsModalProps {
  open: boolean;
  onClose: () => void;
}

export const formatPrice = (pack: CreditPack) =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: pack.currency,
    maximumFractionDigits: 0,
  }).format(pack.price);

const BuyCreditsModal = ({ open, onClose }: BuyCreditsModalProps) => {
  const { data: packs, isLoading } = useGetCreditPacksQuery(undefined, { skip: !open });
  const [purchase, { isLoading: isPurchasing }] = usePurchaseCreditsMutation();
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  useEffect(() => {
    if (open) {
      setResult(null);
      setSelected(null);
    }
  }, [open]);

  useEffect(() => {
    if (packs && !selected) {
      setSelected(packs.find((p) => p.popular)?.id ?? packs[0]?.id ?? null);
    }
  }, [packs, selected]);

  const handlePurchase = async () => {
    if (!selected) return;
    setResult(null);
    try {
      const res = await purchase({ packId: selected }).unwrap();
      if (res.checkoutUrl) {
        window.location.href = res.checkoutUrl;
        return;
      }
      const pack = packs?.find((p) => p.id === selected);
      setResult({ type: "success", msg: `${pack?.credits.toLocaleString()} credits added to your account.` });
    } catch (err: any) {
      setResult({ type: "error", msg: err?.data?.message || "Purchase failed. Please try again." });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1, pr: 6 }}>
        <AutoAwesomeIcon sx={{ color: "#4F39F6" }} />
        <Typography variant="h6" fontWeight={700} component="span">
          Buy AI credits
        </Typography>
        <IconButton onClick={onClose} sx={{ position: "absolute", right: 12, top: 12 }} aria-label="Close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ p: 2, mb: 2.5, borderRadius: 2, bgcolor: "#F8FAFC", border: "1px solid #E2E8F0" }}>
          <CreditUsageBar />
        </Box>

        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress size={28} />
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
              gap: 1.5,
            }}
          >
            {packs?.map((pack) => {
              const isSel = selected === pack.id;
              return (
                <Box
                  key={pack.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelected(pack.id)}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSelected(pack.id)}
                  sx={{
                    position: "relative",
                    p: 2,
                    borderRadius: 2,
                    cursor: "pointer",
                    border: "2px solid",
                    borderColor: isSel ? "#4F39F6" : "#E2E8F0",
                    bgcolor: isSel ? "#EEF2FF" : "background.paper",
                    transition: "all 0.15s ease",
                    "&:hover": { borderColor: "#A5B4FC" },
                  }}
                >
                  {pack.popular && (
                    <Chip
                      label="Popular"
                      size="small"
                      sx={{
                        position: "absolute",
                        top: -11,
                        right: 10,
                        height: 20,
                        fontSize: 10,
                        fontWeight: 700,
                        bgcolor: "#4F39F6",
                        color: "#fff",
                      }}
                    />
                  )}
                  <Typography fontWeight={600} fontSize={14}>
                    {pack.name}
                  </Typography>
                  <Typography fontWeight={800} fontSize={22} sx={{ my: 0.5 }}>
                    {pack.credits.toLocaleString()}
                    <Typography component="span" fontSize={12} color="text.secondary" fontWeight={500}>
                      {" "}credits
                    </Typography>
                  </Typography>
                  <Typography fontWeight={600} color="#4F39F6">
                    {formatPrice(pack)}
                  </Typography>
                  {pack.description && (
                    <Typography variant="caption" color="text.secondary">
                      {pack.description}
                    </Typography>
                  )}
                </Box>
              );
            })}
          </Box>
        )}

        {result && (
          <Alert severity={result.type} sx={{ mt: 2 }}>
            {result.msg}
          </Alert>
        )}

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 3 }}>
          <Button onClick={onClose} sx={{ textTransform: "none" }}>
            {result?.type === "success" ? "Done" : "Cancel"}
          </Button>
          <Button
            variant="contained"
            disabled={!selected || isPurchasing}
            onClick={handlePurchase}
            startIcon={isPurchasing ? <CircularProgress size={16} color="inherit" /> : null}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
              px: 3,
              background: "linear-gradient(135deg, #4F39F6 0%, #8B5CF6 100%)",
            }}
          >
            {isPurchasing ? "Processing…" : "Purchase"}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default BuyCreditsModal;
