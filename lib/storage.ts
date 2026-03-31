import { supabase } from "@/lib/supabase";

export type UploadResult = {
  path: string;
  publicUrl: string;
};

function generateObjectPath(prefix: string, filename: string) {
  const safeName = filename.replaceAll(/[^\w.\-]+/g, "_");
  const id =
    globalThis.crypto && "randomUUID" in globalThis.crypto
      ? globalThis.crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return `${prefix}/${id}-${safeName}`;
}

export async function uploadPublicFile({
  bucket,
  file,
  prefix,
}: {
  bucket: string;
  file: File;
  prefix: string;
}): Promise<UploadResult> {
  const path = generateObjectPath(prefix, file.name);

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(path, file, { upsert: true, contentType: file.type });

  if (uploadError) {
    throw uploadError;
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return { path, publicUrl: data.publicUrl };
}

export async function removeFile({
  bucket,
  path,
}: {
  bucket: string;
  path: string;
}) {
  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) {
    throw error;
  }
}

