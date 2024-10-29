// import * as words from "../utils/constants"
// export const  handleFormSubmit= async (language:  string) => {
//     let wordsToFetch = new Array()
//     for(let w in words){
//         wordsToFetch.push(w)
//     }

//     const res = await sendToTranslationServer(wordsToFetch, language)
//     res.forEach((w: string, i: number) => {
//         localStorage.setItem(wordsToFetch[i],w );
//     })
//     localStorage.setItem("language", language);
//   return 
// }

// // Function to send the content to the translation server
// async function sendToTranslationServer(content: string[], language:string) {
//   const response = await fetch("https://localhost:8081/translate", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ words:content, targetLan: language }), // Send the content and language
//   });

//   if (!response.ok) {
//     throw new Error("Translation request failed.");
//   }

//   const result = await response.json(); 
//   return result;
// }
