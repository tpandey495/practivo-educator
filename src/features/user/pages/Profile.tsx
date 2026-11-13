import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import PageToolbarLayout from "../../../components/ui/PageToolbarLayout";
import { useAuth } from "../../../hooks/useAuth";
import { useForgotPasswordMutation } from "../../auth/api/authApi";
import { useUpdateProfileMutation } from "../api/userApi";

const BRAND = "#4F39F6";
const GRADIENT = "linear-gradient(to right, #ef4444, #ec4899)";

const cardSx = {
  p: { xs: 2.5, md: 3 },
  borderRadius: "16px",
  border: "1px solid #E6E6E6",
  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  backgroundColor: "background.paper",
};

/** Pick the first non-empty string from a list of candidate values. */
const pick = (...values: unknown[]): string => {
  for (const v of values) {
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return "";
};

interface SectionProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

const Section = ({ icon, title, subtitle, action, children }: SectionProps) => (
  <Paper elevation={0} sx={cardSx}>
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: 2.5 }}>
      <Box
        sx={{
          width: 40,
          height: 40,
          flexShrink: 0,
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: `${BRAND}14`,
          color: BRAND,
        }}
      >
        {icon}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="subtitle1" fontWeight={600}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </Box>
      {action}
    </Box>
    <Divider sx={{ mb: 2.5 }} />
    {children}
  </Paper>
);

const Field = ({
  label,
  value,
  copyable,
  onCopy,
}: {
  label: string;
  value: string;
  copyable?: boolean;
  onCopy?: (value: string) => void;
}) => (
  <Box sx={{ minWidth: 0 }}>
    <Typography
      variant="caption"
      sx={{ color: "text.secondary", fontWeight: 500, textTransform: "uppercase", letterSpacing: 0.4 }}
    >
      {label}
    </Typography>
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.5 }}>
      <Typography
        variant="body1"
        fontWeight={500}
        sx={{ wordBreak: "break-word", color: value ? "text.primary" : "text.disabled" }}
      >
        {value || "Not provided"}
      </Typography>
      {copyable && value && (
        <Button
          size="small"
          onClick={() => onCopy?.(value)}
          sx={{ minWidth: 0, p: 0.5, color: "text.secondary" }}
          aria-label={`Copy ${label}`}
        >
          <ContentCopyRoundedIcon sx={{ fontSize: 16 }} />
        </Button>
      )}
    </Box>
  </Box>
);

const gridSx = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
  gap: { xs: 2, sm: 3 },
};

const Profile: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();
  const [forgotPassword, { isLoading: isSendingReset }] = useForgotPasswordMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [toast, setToast] = useState<{ message: string; severity: "success" | "error" } | null>(null);

  // The profile response shape varies, so read every field defensively.
  const profile = useMemo(() => {
    const u: any = user || {};
    const org: any = u.organization || u.organisation || u.org || {};
    return {
      firstName: pick(u.firstName, u.first_name),
      lastName: pick(u.lastName, u.last_name),
      username: pick(u.username, u.userName),
      email: pick(u.email),
      orgName: pick(u.orgName, u.organizationName, org.name, org.orgName),
      orgEmail: pick(u.orgEmail, u.organizationEmail, org.email, u.email),
      orgCode: pick(u.orgCode, org.orgCode, org.code),
      picture: pick(u.picture, u.photoURL),
    };
  }, [user]);

  useEffect(() => {
    setFirstName(profile.firstName);
    setLastName(profile.lastName);
  }, [profile.firstName, profile.lastName]);

  const fullName = [profile.firstName, profile.lastName].filter(Boolean).join(" ");
  const displayName = fullName || profile.username || "User";
  const initials =
    (profile.firstName && profile.lastName
      ? `${profile.firstName[0]}${profile.lastName[0]}`
      : displayName.slice(0, 2)
    ).toUpperCase();

  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setToast({ message: "Copied to clipboard", severity: "success" });
    } catch {
      setToast({ message: "Couldn't copy to clipboard", severity: "error" });
    }
  };

  const handleCancel = () => {
    setFirstName(profile.firstName);
    setLastName(profile.lastName);
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      setToast({ message: "First and last name are required", severity: "error" });
      return;
    }
    try {
      await updateProfile({ firstName: firstName.trim(), lastName: lastName.trim() }).unwrap();
      setToast({ message: "Profile updated", severity: "success" });
      setIsEditing(false);
    } catch (error: any) {
      setToast({ message: error?.data?.message || "Failed to update profile", severity: "error" });
    }
  };

  const handlePasswordReset = async () => {
    if (!profile.email) return;
    try {
      await forgotPassword({ email: profile.email }).unwrap();
      setToast({ message: `Password reset link sent to ${profile.email}`, severity: "success" });
    } catch (error: any) {
      setToast({ message: error?.data?.message || "Failed to send reset link", severity: "error" });
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1100, mx: "auto" }}>
      <PageToolbarLayout title="Profile" showActions={false}>
        <Box sx={{ display: "grid", gap: 3 }}>
          {/* ===== Header card ===== */}
          <Paper elevation={0} sx={{ ...cardSx, p: 0, overflow: "hidden" }}>
            <Box sx={{ height: { xs: 72, md: 96 }, background: `linear-gradient(120deg, ${BRAND}, #ec4899)` }} />
            <Box
              sx={{
                px: { xs: 2.5, md: 3 },
                pb: 3,
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "flex-start", sm: "flex-end" },
                gap: 2,
                mt: { xs: -5, md: -6 },
              }}
            >
              <Avatar
                src={profile.picture || undefined}
                sx={{
                  width: { xs: 80, md: 96 },
                  height: { xs: 80, md: 96 },
                  fontSize: { xs: "1.75rem", md: "2rem" },
                  fontWeight: 600,
                  color: "#fff",
                  background: GRADIENT,
                  border: "4px solid",
                  borderColor: "background.paper",
                }}
              >
                {initials}
              </Avatar>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="h5" fontWeight={700} sx={{ wordBreak: "break-word" }}>
                  {displayName}
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1, mt: 0.5 }}>
                  {profile.username && (
                    <Typography variant="body2" color="text.secondary">
                      @{profile.username}
                    </Typography>
                  )}
                  {profile.email && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "text.secondary" }}>
                      <EmailOutlinedIcon sx={{ fontSize: 16 }} />
                      <Typography variant="body2">{profile.email}</Typography>
                    </Box>
                  )}
                </Box>
              </Box>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                <Chip label="Admin" size="small" sx={{ fontWeight: 600, backgroundColor: `${BRAND}14`, color: BRAND }} />
                {profile.orgName && (
                  <Chip
                    icon={<BusinessOutlinedIcon />}
                    label={profile.orgName}
                    size="small"
                    variant="outlined"
                    sx={{ fontWeight: 500 }}
                  />
                )}
              </Box>
            </Box>
          </Paper>

          {/* ===== Personal details ===== */}
          <Section
            icon={<PersonOutlineOutlinedIcon />}
            title="Personal details"
            subtitle="Your name and login identity"
            action={
              !isEditing && (
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<EditOutlinedIcon />}
                  onClick={() => setIsEditing(true)}
                  sx={{ textTransform: "none", borderRadius: 2 }}
                >
                  Edit
                </Button>
              )
            }
          >
            {isEditing ? (
              <Box sx={{ display: "grid", gap: 3 }}>
                <Box sx={gridSx}>
                  <TextField
                    label="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    size="small"
                    fullWidth
                    required
                  />
                  <TextField
                    label="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    size="small"
                    fullWidth
                    required
                  />
                </Box>
                <Box sx={gridSx}>
                  <Field label="Username" value={profile.username} />
                  <Field label="Email" value={profile.email} />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                  <Button onClick={handleCancel} disabled={isSaving} sx={{ textTransform: "none" }}>
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={isSaving}
                    sx={{ textTransform: "none", borderRadius: 2, px: 3 }}
                  >
                    {isSaving ? "Saving…" : "Save changes"}
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box sx={gridSx}>
                <Field label="First name" value={profile.firstName} />
                <Field label="Last name" value={profile.lastName} />
                <Field label="Username" value={profile.username} />
                <Field label="Email" value={profile.email} />
              </Box>
            )}
          </Section>

          {/* ===== Organization ===== */}
          <Section
            icon={<BusinessOutlinedIcon />}
            title="Organization"
            subtitle="The organization you registered with"
          >
            <Box sx={gridSx}>
              <Field label="Organization name" value={profile.orgName} />
              <Field label="Organization email" value={profile.orgEmail} />
              {profile.orgCode && (
                <Field label="Organization code" value={profile.orgCode} copyable onCopy={handleCopy} />
              )}
            </Box>
          </Section>

          {/* ===== Security ===== */}
          <Section icon={<LockOutlinedIcon />} title="Security" subtitle="Manage how you sign in">
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "flex-start", sm: "center" },
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <Field label="Password" value="••••••••••" />
              <Button
                variant="outlined"
                onClick={handlePasswordReset}
                disabled={isSendingReset || !profile.email}
                sx={{ textTransform: "none", borderRadius: 2 }}
              >
                {isSendingReset ? "Sending…" : "Send password reset link"}
              </Button>
            </Box>
          </Section>
        </Box>
      </PageToolbarLayout>

      <Snackbar
        open={!!toast}
        autoHideDuration={4000}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        {toast ? (
          <Alert severity={toast.severity} onClose={() => setToast(null)} variant="filled">
            {toast.message}
          </Alert>
        ) : undefined}
      </Snackbar>
    </Box>
  );
};

export default Profile;
