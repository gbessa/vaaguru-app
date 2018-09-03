export interface InvitationDTO {
    id: number;
    inviter_email: string;
    invited_email: string;
    team_id: number;
    team_name: string;
    status: number;
}   