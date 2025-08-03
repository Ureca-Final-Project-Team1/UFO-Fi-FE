import { toast } from 'sonner';

import { ApiResponse, isSuccessResponse } from '@/backend/types/api';

interface HandleApiActionParams<T = unknown> {
  apiCall: () => Promise<ApiResponse<T>>;
  successMessage: string;
  errorMessage: string;
  onSuccess?: (response: T) => void;
  onError?: (error: ApiResponse<T> | unknown) => void;
}

export async function handleApiAction<T>({
  apiCall,
  successMessage,
  errorMessage,
  onSuccess,
  onError,
}: HandleApiActionParams<T>): Promise<void> {
  try {
    const response = await apiCall();

    if (isSuccessResponse(response)) {
      toast.success(successMessage);
      onSuccess?.(response.content);
    } else {
      toast.error(errorMessage);
      onError?.(response);
    }
  } catch (error) {
    toast.error(errorMessage);
    onError?.(error);
  }
}
