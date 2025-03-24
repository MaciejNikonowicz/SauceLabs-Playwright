import { config } from 'dotenv';
import { Users } from '../types/env.types';

// Load environment variables from .env
config();

// Construct the users object from process.env
export const users: Users = {
    standard_user: process.env.STANDARD_USER ?? '',
    locked_out_user: process.env.LOCKED_OUT_USER ?? '',
    problem_user: process.env.PROBLEM_USER ?? '',
    performance_glitch_user: process.env.PERFORMANCE_GLITCH_USER ?? '',
    error_user: process.env.ERROR_USER ?? '',
    visual_user: process.env.VISUAL_USER ?? '',
    password: process.env.PASSWORD ?? ''
};