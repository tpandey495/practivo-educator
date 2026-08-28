import MultipleChoiceFields from "./objective-type/MultipleChoiceFields";
import SingleChoiceFields from "./objective-type/SingleChoiceFields";
import FillUpFields from "./fillup/FillUpFields";
import SubjectiveFields from "./subjective/SubjectiveFields";
import BlogFields from "./blog/BlogFields";
import VideoFields from "./video/VideoFields";
import { ContentFieldsProps } from "../../types/ContentFields.types";

type ContentType = "multiple_choice" | "single_choice" | "fill_up" | "subjective" | "blog" | "video" | "code";

export function getContentTypeComponent(type: ContentType): React.ComponentType<ContentFieldsProps> | null {
    switch (type) {
        case "multiple_choice":
            return MultipleChoiceFields as unknown as React.ComponentType<ContentFieldsProps>;
        case "single_choice":
            return SingleChoiceFields as unknown as React.ComponentType<ContentFieldsProps>;
        case "fill_up":
            return FillUpFields as unknown as React.ComponentType<ContentFieldsProps>;
        case "subjective":
            return SubjectiveFields as unknown as React.ComponentType<ContentFieldsProps>;
        case "blog":
            return BlogFields as unknown as React.ComponentType<ContentFieldsProps>;
        case "video":
            return VideoFields as unknown as React.ComponentType<ContentFieldsProps>;
        case "code":
            return VideoFields as unknown as React.ComponentType<ContentFieldsProps>;
        default:
            return null;
    }
}


