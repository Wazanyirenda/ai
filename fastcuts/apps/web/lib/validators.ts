import { z } from 'zod';

export const projectSchema = z.object({
  title: z.string().min(1),
  sourceType: z.enum(['UPLOAD', 'YOUTUBE']),
  sourceUrl: z.string().url().optional().nullable()
});

export const affiliateTrackSchema = z.object({
  code: z.string().min(3)
});
