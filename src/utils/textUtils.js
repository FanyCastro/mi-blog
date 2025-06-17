import { renderRichText } from "@storyblok/react";

export const getPlainTextFromRichText = (richText, maxLength = 100) => {
  if (!richText || !richText.content) {
    return "";
  }

  // Render the rich text to HTML
  const htmlContent = renderRichText(richText);

  // Create a temporary div element to parse the HTML
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlContent;

  // Get the plain text content
  let plainText = tempDiv.textContent || tempDiv.innerText || "";

  // Remove extra whitespace and newlines
  plainText = plainText.replace(/\s\s+/g, ' ').trim();

  // Truncate the text if it's too long
  if (plainText.length > maxLength) {
    return plainText.substring(0, maxLength) + '...';
  }

  return plainText;
}; 