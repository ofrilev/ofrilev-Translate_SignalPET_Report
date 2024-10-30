export const  fetchFirstWords = async (language:  string, wordsToFetch: string[]) => {
    const res = await sendToTranslationServer(wordsToFetch, language);
        // Define the translation object
        const translateObj: { [language: string]: { [englishWord: string]: string } } = {
            [language]: {}
        };
        if (res.length > 0){
            res.forEach((translatedWord: string, i: number) => {
                const englishWord = wordsToFetch[i];
                // Populate the translation object
                translateObj[language][englishWord] = translatedWord;
            
            });
            // Store the entire translation object for the language in localStorage
            localStorage.setItem(`language-${language}`, JSON.stringify(translateObj));
        }
        return translateObj[language];

};
    

// Function to send the content to the translation server
async function sendToTranslationServer(content: string[], language:string) {
    try{
    const response = await fetch("http://localhost:8081/app/translate", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ words:content, targetLan: language }), // Send the content and language
    });

    if (!response.ok) {
        throw new Error("Translation request failed.");
    }

    const result = await response.json(); 
    return result;
    
    }
    catch(err)
    {
        console.log(`failed to fetch with error ${err}`)
        return
    }

}
