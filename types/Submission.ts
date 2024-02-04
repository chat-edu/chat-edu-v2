import {User} from "@/types/User";
import {MultipleChoiceQuestion} from "@/types/assignment/MultipleChoiceQuestion";
import {Assignment} from "@/types/assignment/Assignment";
import {QuestionTypes} from "@/types/assignment/Question";

export interface SubmissionInput {
    userId: User["id"];
    questionId: MultipleChoiceQuestion["id"];
    answer: string;
}

export interface Submission extends SubmissionInput {
    id: number;
    questionType: QuestionTypes;
}

export interface UserSubmission {
    userId: User["id"];
    assignmentId: Assignment["id"];
    submissions: Submission[];
}