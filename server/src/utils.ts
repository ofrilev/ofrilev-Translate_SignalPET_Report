type TranslateWord = Map<string, string>;

export const LanDB: { [key: string]: TranslateWord } = {
    ES: new Map<string, string>(),
    DE: new Map<string, string>(),
    FR: new Map<string, string>(),
    PT: new Map<string, string>(),
};

const fetchFromAPI = async (wordsToFetch: string[], targetLan: string) => {
    return fetch("http://localhost:8080/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            source: "en",
            q: wordsToFetch,
            target: targetLan,
            format: "text",
        }),
    });
};

export const getTranslate = async (words: string[], targetLan: string): Promise<string[]> => {
    let res: string[] = [];
    let wordsToFetch: string[] = [];
    const tr = targetLan.toUpperCase();

    if (!LanDB[tr]) {
        console.error(`Language ${tr} not supported`);
        return res;
    }

    // Check each word for translation
    for (let w of words) {
        const translation = LanDB[tr].get(w);
        if (translation) {
            res.push(translation);
        } else {
            wordsToFetch.push(w);
            console.log(`Translation for "${w}" not found in ${tr}`);
        }
    }

    if (wordsToFetch.length) {
        const apiResponse = await fetchFromAPI(wordsToFetch, targetLan);
        if (apiResponse.ok) {
            const data = await apiResponse.json();
            const translatedText = data.translatedText;

            translatedText.forEach((t: string, i: number) => {
                LanDB[tr].set(wordsToFetch[i], t);
                res.push(t);
            });
        } else {
            console.error(`Failed to fetch translations, status code: ${apiResponse.status}`);
        }
    }
    return res;
};
