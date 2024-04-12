import {NotebookIdParams} from "@/app/api/topicNodes/[notebookId]/NotebookIdParams";
import {User} from "@/types/User";

export interface UserIdParams extends NotebookIdParams {
    userId: User['id'];
}