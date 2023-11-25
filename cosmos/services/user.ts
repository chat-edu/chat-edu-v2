import {add, del, find, get, update} from "@/cosmos/services/base";

import {USERS_TABLE} from "@/cosmos/constants/tables";

import {User, UserRow, UserScore, UserScoreRow} from "@/types/User";
import {NotebookScore, NotebookScoreRow} from "@/types/Notebook";

export const findAllUsers = async (): Promise<User[]> => {
    return find('SELECT * FROM Users;', [], transform);
};

// gets all users and sots them by their score
export const findAllUsersByScore = async (): Promise<User[]> => {
    const queryText = `
        WITH RankedUsers AS (
            SELECT
                u.id AS id,
                u.name AS name,
                u.username AS username,
                u.email AS email,
                COALESCE(SUM(s.score), 0) AS score,
                RANK() OVER (ORDER BY COALESCE(SUM(s.score), 0) DESC) AS rank
            FROM Users u
            LEFT JOIN Scores s ON u.id = s.user_id
            GROUP BY u.id, u.username, u.name
        )
        SELECT
            id,
            name,
            email,
            username,
            score,
            rank
        FROM RankedUsers
        ORDER BY rank
    `;
    return find(queryText, [], transformUserScore);
}

export const addUser = async (user: User): Promise<boolean> => {
    return add(USERS_TABLE, user);
};

export const updateUser = async (id: string, updatedFields: Partial<User>): Promise<boolean> => {
    return update(USERS_TABLE, [id], updatedFields);
};

export const getUser = async (id: string): Promise<User | null> => {
    const query = 'SELECT * FROM Users WHERE id = $1;';
    return get(query, [id], transform);
};

export const deleteUser = async (id: string): Promise<boolean> => {
    return del(USERS_TABLE, [id]);
};

// finds the top users by score. Include rank in the row select
export const findScoresByUserId = async (userId: string): Promise<NotebookScore[]> => {
    const queryText = `
        SELECT
            Users.id AS user_id,
            Users.username,
            Notebooks.id,
            Notebooks.name,
            Scores.score,
    `;
    return find(queryText, [userId], transformNotebookScore);
}

const transform = (user: UserRow): User => ({
    id: user.id,
    name: user.name,
    email: user.email,
    username: user.username,
    profilePictureUrl: user.profile_picture_url || `https://api.multiavatar.com/${user.id}.png`,
});

const transformUserScore = (user: UserScoreRow): UserScore => ({
    ...transform(user),
    score: parseInt(user.score || '0'),
    rank: parseInt(user.rank || '0'),
})

const transformNotebookScore = (row: NotebookScoreRow): NotebookScore => ({
    userId: row.user_id,
    username: row.username,
    id: row.id,
    name: row.name,
    userScore: row.score,
    numNotes: parseInt(row.num_notes || '0')
});