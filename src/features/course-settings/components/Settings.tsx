import { Box } from "@mui/material";
import { useState } from "react";
import { useModal } from "../../../hooks/useModal";
import { DeleteModal } from "../../course/components/DeleteCourseModal";
import { DeleteCourseSection } from "./SettingsSections/DeleteCourseSection";
import { CourseDetailsSection } from "./SettingsSections/CourseDetailsSection";
import { NavigationSection } from "./SettingsSections/NavigationSection";
import { ExpirationSection } from "./SettingsSections/ExpirationSection";
import { CompletionSection } from "./SettingsSections/CompletionSection";
import { RatingSection } from "./SettingsSections/RatingSection";
import { CertificatesSection } from "./SettingsSections/CertificatesSection";
import { ButtonTextSection } from "./SettingsSections/ButtonTextSection";
import { AcknowledgmentSection } from "./SettingsSections/AcknowledgmentSection";
import { DurationSection } from "./SettingsSections/DurationSection";
import { useParams } from "react-router-dom";

export default function Settings() {
  const [selected, setSelected] = useState("free");
  const { isOpen: isDeleteModalOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();
  const { courseId } = useParams();
  
  return (
    <Box 
      display="grid" 
      gap={{ xs: "16px", md: "24px" }}
      sx={{
        p: { xs: 1, sm: 2, md: 0 },
        '& > *': {
          width: '100%'
        }
      }}
    >
      <CourseDetailsSection />
      <ExpirationSection />
      <DurationSection />
      <NavigationSection selected={selected} setSelected={setSelected} />
      <CompletionSection />
      <RatingSection />
      <CertificatesSection />
      <ButtonTextSection />
      <AcknowledgmentSection />
      <DeleteCourseSection onDelete={openDeleteModal} />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        id={Number(courseId!)} // TODO: Get actual course ID
      />
    </Box>
  );
}
