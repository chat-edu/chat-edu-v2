import {NotebookRow, UserRow} from "@/cosmosPostgres/types";
import {
    findUserAssignmentSummariesByNotebookId,
    findUserAssignmentSummariesByUserId
} from "@/cosmosPostgres/services/summaries";
import openai from "@/openai";

export const generateUserNotebookSummary = async (
    notebook_id: NotebookRow["id"],
    user_id: UserRow["id"]
): Promise<string | null> => {
    const userAssignmentSummaries = await findUserAssignmentSummariesByUserId(user_id, notebook_id);

    const response = await openai.chat.completions.create({
        model: process.env.GPT_MODEL_ID as string,
        messages: [
            {
                role: "system",
                content: `
                        The student has completed several assignments and their responses have been graded and summarized.
    
                        Your goal is to provide a two sentence summary of the student's performance and understanding of the class material, which will inform the teacher of the student's understanding and knowledge gaps.
    
                        The summaries are as follows:
    
                        ${userAssignmentSummaries.map((summary) => JSON.stringify(summary)).join("\n")}
    
                        Respond in the second person as if you informing the teacher of the student's performance.
                    
                        Respond in JSON format with the following structure:
    
                        {
                            summary: <string>
                        }
                        
                        The summary should use markdown to format the text, bolding the most important information with asterisks.
                    `,
            }
        ],
        response_format: {
            type: "json_object",
        },
    });

    if(response.choices[0].message.content === null) {
        return null;
    }

    return JSON.parse(response.choices[0].message.content).summary;
}