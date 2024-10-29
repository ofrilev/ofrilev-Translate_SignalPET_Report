import InputTag from "./InputTag";
import { generateXrayAnalysisSummary } from "../utils/strings";
import { translate } from "../utils/translate";

const styles = {
    title: {
        fontSize: "0.875rem",
        lineHeight: "1.25rem",
        fontWeight: 600,
        paddingRight: "10%",
        alignSelf: "center",
        justifyCenter: "center",
        alignText: "center",
    },
};

const ReportAdditionalInformationSection = () => {
    return (
        <div translate="yes">
            <span style={styles.title}>Summary: </span>
            <InputTag editable={true}>{translate(generateXrayAnalysisSummary())}</InputTag>
        </div>
    );
};

export default ReportAdditionalInformationSection;
