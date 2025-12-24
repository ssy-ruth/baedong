import { setupWorker } from "msw/browser";
import { handlers as userHandler } from "@/mocks/handler/userHandler";

export const worker = setupWorker(...userHandler);
