import {getAssignmentSummary} from "@/cosmosPostgres/services/summaries";

import {AssignmentIdParams} from "@/app/api/summaries/assignment/[assignmentId]/AssignmentIdParams";

export const GET = async (req: Request, { params }: { params: AssignmentIdParams }) => {
    return Response.json(await getAssignmentSummary(params.assignmentId));
}