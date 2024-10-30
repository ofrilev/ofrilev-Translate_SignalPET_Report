import { useEffect, useState } from "react";
import "./App.css";
import ReportHeader from "./components/ReportHeader";
import ReportPage from "./components/ReportPage";
import ReportSection from "./components/ReportSection";
import ReportBasicInfoSection from "./components/ReportBasicInfoSection";
import ReportAdditionalInformationSection from "./components/ReportAdditionalInformationSection";
import { additionalInformation } from "./utils/constants";
import LoaderGif from "./components/ui/LoaderGif";
import { LanguageChosser , Language} from "./languageChosser/languageChosser";

const styles = {
  wrapper: {
    backgroundColor: "#052e39",
    backdropFilter: "blur(2rem)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column" as "column",
    gap: "2rem",
    height: "95%",
  },
};

function App() {
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<Language>(Language.English);
  const [translationElementsSpan, setTranslationElementsSpan] =
    useState<NodeListOf<HTMLSpanElement> | null>(null);
  const [originalValuesText, setOriginalValuesText] = useState<string[]>([]);

  // Fetch translation elements and their original values after the component mounts
  useEffect(() => {
    let elements = Array.from(
      document.querySelectorAll<HTMLSpanElement>('span[translate="yes"]')
    ).filter((elem) => elem.innerHTML !== ""); // Convert NodeList to array and filter

    const originalValues = elements.map((elem) => {
      return elem.innerHTML;
    }); // Map to original values
    //@ts-ignore
    setTranslationElementsSpan(elements);
    setOriginalValuesText(originalValues);
  }, []);

  return (
    <>
      {loading && (
        <div>
          <LoaderGif />
        </div>
      )}
      <div style={styles.wrapper}>
        <div style={styles.container}>
          <ReportHeader />
          <ReportPage>
            {translationElementsSpan && (
              <LanguageChosser
                originalValuesText={originalValuesText}
                translationElementsSpan={translationElementsSpan}
                language={language}
                setLanguage={setLanguage}
                setLoading={setLoading}
              />
            )}
            <ReportBasicInfoSection />
          </ReportPage>
          <ReportPage>
            <ReportSection title={additionalInformation.title}>
              <ReportAdditionalInformationSection />
            </ReportSection>
          </ReportPage>
        </div>
      </div>
    </>
  );
}

export default App;
