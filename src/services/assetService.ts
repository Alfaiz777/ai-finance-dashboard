import API from "./api";

// get asset
export const getAssets = async () => {
  const response = await API.get("/assets");

  return response.data;
};

// create asset
export const createAsset = async (assetData: any) => {
  const response = await API.post("/assets", assetData);

  return response.data;
};

// delete asset
export const deleteAsset = async (id: string) => {
  const response = await API.delete(`/assets/${id}`);

  return response.data;
};
