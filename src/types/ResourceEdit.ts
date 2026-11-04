import type { ResourceEntry } from "types/ResourceEntry";

type ResourceEditReviewStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export const ResourceEditReviewStatus: Record<ResourceEditReviewStatus, ResourceEditReviewStatus> = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export type ResourceEdit = {
  id?: number;
  mapped_resource: number;
  review_status?: ResourceEditReviewStatus;
  submitted_by?: string;
  submitted_at?: Date | string;
  reviewed_by?: string;
  reviewed_at?: Date | string;
  review_notes?: string;
} & Omit<ResourceEntry, 'id'>;
