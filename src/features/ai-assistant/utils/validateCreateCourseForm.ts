import { CreateCourseInput, ValidationErrors } from "../types/aiAssistant.types";

export const MAX_COURSE_NAME_LENGTH = 255;
export const MAX_DESCRIPTION_LENGTH = 2000;
export const ALLOWED_DIFFICULTIES = ["beginner", "intermediate", "advanced"] as const;
export const MIN_PLAYLIST_VIDEOS = 1;
export const MAX_PLAYLIST_VIDEOS = 200;

/**
 * Validates whether a given string is a valid YouTube playlist or video URL.
 */
export function isValidYouTubeUrl(url: string): boolean {
  if (!url || !url.trim()) return false;
  const trimmed = url.trim();
  const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/i;
  return pattern.test(trimmed);
}

/**
 * Validates that a URL is a YouTube playlist link (has a `list=` parameter).
 */
export function isValidYouTubePlaylistUrl(url: string): boolean {
  if (!isValidYouTubeUrl(url)) return false;
  return /[?&]list=[\w-]+/i.test(url.trim());
}

/**
 * Validates the YouTube playlist flow: playlist URL, difficulty and max videos.
 */
function validatePlaylistForm(values: CreateCourseInput): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!values.playlistUrl || !values.playlistUrl.trim()) {
    errors.playlistUrl = "YouTube playlist URL is required.";
  } else if (!isValidYouTubePlaylistUrl(values.playlistUrl)) {
    errors.playlistUrl = "Enter a YouTube playlist link (it contains \"list=\").";
  }

  if (!values.difficulty || !ALLOWED_DIFFICULTIES.includes(values.difficulty)) {
    errors.difficulty = "Select a valid difficulty.";
  }

  const maxVideos = values.maxVideos;
  if (
    maxVideos === undefined ||
    !Number.isInteger(maxVideos) ||
    maxVideos < MIN_PLAYLIST_VIDEOS ||
    maxVideos > MAX_PLAYLIST_VIDEOS
  ) {
    errors.maxVideos = `Number of videos must be between ${MIN_PLAYLIST_VIDEOS} and ${MAX_PLAYLIST_VIDEOS}.`;
  }

  return errors;
}

/**
 * Validates the Create Course form inputs.
 * With { isYouTubeFlow: true } only the playlist fields are checked.
 * Returns an object containing field errors, or an empty object if valid.
 */
export function validateCreateCourseForm(
  values: CreateCourseInput,
  options: { isYouTubeFlow?: boolean } = {}
): ValidationErrors {
  if (options.isYouTubeFlow) {
    return validatePlaylistForm(values);
  }

  const errors: ValidationErrors = {};

  // Course Name Validation
  if (!values.courseName || !values.courseName.trim()) {
    errors.courseName = "Course name is required.";
  } else if (values.courseName.trim().length > MAX_COURSE_NAME_LENGTH) {
    errors.courseName = `Course name must not exceed ${MAX_COURSE_NAME_LENGTH} characters.`;
  }

  // Description Validation
  if (!values.description || !values.description.trim()) {
    errors.description = "Description is required.";
  } else if (values.description.trim().length > MAX_DESCRIPTION_LENGTH) {
    errors.description = `Description must not exceed ${MAX_DESCRIPTION_LENGTH} characters.`;
  }

  // Difficulty Validation
  if (!values.difficulty || !ALLOWED_DIFFICULTIES.includes(values.difficulty)) {
    errors.difficulty = "Select a valid difficulty.";
  }

  // Optional YouTube Playlist URL validation
  if (values.playlistUrl && values.playlistUrl.trim()) {
    if (!isValidYouTubeUrl(values.playlistUrl)) {
      errors.playlistUrl = "Please enter a valid YouTube playlist or video URL.";
    }
  }

  return errors;
}
