import UploadBox from "@components/ui/uploadbox/UploadBox";
import { Box, Typography, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/PlayCircleOutline";
import { Controller } from "react-hook-form";
import { ContentFieldsProps } from "./ContentFields.types";

function getYouTubeEmbed(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      return v ? `https://www.youtube.com/embed/${v}` : null;
    }
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace("/", "");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    return null;
  } catch {
    return null;
  }
}

export default function VideoFields({
  control,
  errors,
  clearErrors,
  watch,
  setValue,
}: ContentFieldsProps) {
  const videoUrl: string = watch("videoUrl");
  const videoFileName: string = watch("videoFileName");

  const handleFiles = (files: FileList) => {
    const file = files && files[0];
    if (!file) return;

    setValue("videoFileName", file.name, {
      shouldValidate: true,
      shouldDirty: true,
    });

    // Clear URL errors when file selected
    clearErrors("videoUrl");
  };

  const renderPreview = () => {
    if (!videoUrl) return null;

    const yt = getYouTubeEmbed(videoUrl);
    if (yt) {
      return (
        <Box sx={{ mt: 2 }}>
          <Box
            component="iframe"
            src={yt}
            sx={{ width: "100%", height: 240, border: 0, borderRadius: 1.5 }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </Box>
      );
    }

    const isDirectVideo = /(\.mp4|\.webm|\.ogg)(\?.*)?$/i.test(videoUrl);
    if (isDirectVideo) {
      return (
        <Box sx={{ mt: 2 }}>
          <Box
            component="video"
            src={videoUrl}
            sx={{ width: "100%", height: 240, borderRadius: 1.5 }}
            controls
          />
        </Box>
      );
    }

    return null;
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {/* Video Duration Section */}
      <Box>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 500,
            color: "#344054",
            mb: 1,
          }}
        >
          Video Duration (seconds) <span style={{ color: "#D92D20" }}>*</span>
        </Typography>
        <Controller
          name="duration"
          control={control}
          rules={{
            required: "Duration is required for video",
            min: { value: 1, message: "Duration must be greater than 0" },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              placeholder="Enter video duration in seconds"
              fullWidth
              error={!!errors.duration}
              inputProps={{ min: 1 }}
              sx={{
                maxWidth: "300px",
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#FFFFFF",
                  borderRadius: "8px",
                  "& fieldset": {
                    borderColor: errors.duration ? "#D92D20" : "#D0D5DD",
                  },
                  "&:hover fieldset": {
                    borderColor: errors.duration ? "#D92D20" : "#98A2B3",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errors.duration ? "#D92D20" : "#4F39F6",
                    borderWidth: "2px",
                  },
                },
                "& .MuiInputBase-input": {
                  fontSize: "14px",
                  padding: "10px 14px",
                },
              }}
              onChange={(e) => {
                const value = e.target.value;
                field.onChange(value === "" ? "" : Number(value));
              }}
            />
          )}
        />
      </Box>

      {/* Video Link Section */}
      <Box>
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: "16px",
              fontWeight: 600,
              color: "#101828",
              mb: 0.5,
            }}
          >
            Video Source
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#667085",
            }}
          >
            Provide a video URL or upload a video file. Supported formats: YouTube, Vimeo, or direct .mp4 links.
          </Typography>
        </Box>

        <Controller
          name="videoUrl"
          control={control}
          rules={{
            validate: (value: string) => {
              const hasLink = !!(value && value.trim());
              const hasFile = !!(videoFileName && String(videoFileName).trim());
              return hasLink || hasFile || "Provide a link or upload a file";
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              placeholder="Paste YouTube, Vimeo, or direct .mp4 video link"
              variant="outlined"
              error={!!errors.videoUrl}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#FFFFFF",
                  borderRadius: "8px",
                  "& fieldset": {
                    borderColor: errors.videoUrl ? "#D92D20" : "#D0D5DD",
                  },
                  "&:hover fieldset": {
                    borderColor: errors.videoUrl ? "#D92D20" : "#98A2B3",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errors.videoUrl ? "#D92D20" : "#4F39F6",
                    borderWidth: "2px",
                  },
                },
                "& .MuiInputBase-input": {
                  fontSize: "14px",
                  padding: "10px 14px",
                },
              }}
              onChange={(e) => {
                clearErrors("videoUrl");
                field.onChange(e.target.value);
              }}
            />
          )}
        />

        {/* Video Preview */}
        {renderPreview() && (
          <Box sx={{ mt: 2 }}>
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: 500,
                color: "#667085",
                mb: 1,
              }}
            >
              Preview
            </Typography>
            {renderPreview()}
          </Box>
        )}
      </Box>

      {/* Video Upload Section */}
      <Box>
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: "16px",
              fontWeight: 600,
              color: "#101828",
              mb: 0.5,
            }}
          >
            Upload Video File
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#667085",
            }}
          >
            Alternatively, upload a video file directly. Maximum file size: 25 MB.
          </Typography>
        </Box>

        <Box
          sx={{
            width: "100%",
            border: "1px dashed #D0D5DD",
            borderRadius: "12px",
            p: 2,
            backgroundColor: "#FAFBFC",
            "&:hover": {
              borderColor: "#4F39F6",
              backgroundColor: "#F9FAFB",
            },
          }}
        >
          <UploadBox
            icon={<CloudUploadIcon sx={{ fontSize: 28, color: "#4F39F6" }} />}
            description={" (Max. File size: 25 MB)"}
            coloredTitle={"Click to Upload "}
            title={"or drag and drop"}
            onFilesDropped={handleFiles}
          />
        </Box>

        {/* Selected File Name */}
        {videoFileName && (
          <Box
            sx={{
              mt: 2,
              p: 2,
              backgroundColor: "#F0F9FF",
              borderRadius: "8px",
              border: "1px solid #B2DDFF",
            }}
          >
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: 500,
                color: "#344054",
                mb: 0.5,
              }}
            >
              Selected File
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#4F39F6",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              ✓ {videoFileName}
            </Typography>
          </Box>
        )}

        {/* Error when neither link nor file */}
        {!videoUrl && !videoFileName && errors.videoUrl && (
          <Typography
            sx={{
              mt: 1,
              fontSize: "13px",
              color: "#D92D20",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            ⚠️ {errors.videoUrl.message as string}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
