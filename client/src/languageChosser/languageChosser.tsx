import { FC } from "react";
import { fetchFirstWords } from "../translateUtils";
export enum Language {
  English = "en",
  Spanish = "es",
  French = "fr",
  German = "de",
}

interface Props {
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  translationElementsSpan: NodeListOf<Element>;
  originalValuesText: string[];
}

export const LanguageChosser: FC<Props> = ({
  language,
  setLanguage,
  setLoading,
  originalValuesText,
  translationElementsSpan,
}: Props) => {
  const onChange = async (e: any) => {
    setLoading(true);
    if (e === Language.English.toLocaleUpperCase()) {
      // Reset to original values for English
      translationElementsSpan.forEach((span, i) => {
        span.innerHTML = originalValuesText[i];
      });
    } else {
      const lang = localStorage.getItem(`language-${e}`);

      if (!lang) {
        // Fetch translations if language is not set
        const translations = await fetchFirstWords(e, originalValuesText);
        translationElementsSpan.forEach((span, index) => {
          span.innerHTML =
            translations[originalValuesText[index]] ??
            originalValuesText[index];
        });
      } else {
        const translationObject = JSON.parse(lang)[e];
        // Translate using the existing translation method
        translationElementsSpan.forEach((span, index) => {
          span.innerHTML =
            translationObject[originalValuesText[index]] ??
            originalValuesText[index];
        });
      }
    }

    setLanguage(e);
    setLoading(false);
  };

  return (
    <div className="wrapper">
      <select
        id="language"
        name="language"
        value={language}
        onChange={(e) => onChange(e.target.value)}
        required
        className="dropDown"
      >
        <option value="" disabled>
          Select language
        </option>
        <option value="EN">English</option>
        <option value="FR">French</option>
        <option value="DE">German</option>
        <option value="ES">Spanish</option>
        <option value="PT">Portuguese</option>
      </select>
    </div>
  );
};
