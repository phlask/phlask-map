import { useMutation } from '@tanstack/react-query';

const useUploadImageMutation = () => {
  const { data, isPending, mutate, error, isSuccess } = useMutation({
    mutationFn: async (imageFile: File) => {
      // Open a request for a new signed URL for S3 upload
      // Upload the image with a PUT request
      const imageType = imageFile.type;
      const submitUrl = `https://phlask.me/submit-image?type=${imageType}`;
      let signedUploadResponse: Response | null = null;
      try {
        signedUploadResponse = await fetch(submitUrl);
      } catch {
        throw new Error('Could not upload image');
      }

      if (!signedUploadResponse.ok) {
        throw new Error('Could not upload image');
      }

      const signedUploadPaths: { putURL: string; getURL: string } =
        await signedUploadResponse.json();

      const response = await fetch(signedUploadPaths.putURL, {
        method: 'PUT',
        headers: { 'Content-Type': imageFile.type },
        body: imageFile
      });
      if (!response.ok) {
        throw new Error('Could not upload image');
      }

      return signedUploadPaths.getURL;
    }
  });

  return { mutate, data, isPending, error, isSuccess };
};

export default useUploadImageMutation;
