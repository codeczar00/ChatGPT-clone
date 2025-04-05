import OpenAI from 'openai'
const openai = new OpenAI({
    apiKey: "enter-key-here",
    dangerouslyAllowBrowser: true
});

export async function sendMsg(prompt) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            temprature: 0.7,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        }
        )
        console.log(response.choices[0].message.content);
        return response.choices[0].message.content;
    } catch (error) {
        console.error("OpenAI API error: ", error);
        return "Error fetching response from API, Please go to console to see details of error!" ;
    }
}