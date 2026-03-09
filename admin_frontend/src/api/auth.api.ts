import { BASE_URL } from "../config/api.config";

//admin login api
export const loginApi = async (data: { username: string; password: string }) => {
  try {
    const res = await fetch(`${BASE_URL}/v1/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const json = await res.json().catch(() => ({}));

    console.log(json);
    

    if (!res.ok) {
      throw new Error(
        json.message ||
        json.error ||
        json.msg ||
        `Login failed (${res.status})`
      );
    }

    return json;
  } catch (err) {
    console.error("Login fetch error:", err);
    throw err instanceof Error ? err : new Error("Network or server error");
  }
};



//admin logout api
export const logoutApi=async()=>{
    try{
        const res=await fetch(`${BASE_URL}/v1/admin/logout`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            credentials:"include",
        });

        const data=await res.json();

        console.log();
        
        if(!res.ok){
            throw new Error(data.msg || "Logout Failed");
        }
        return data;
    }catch(err){
        console.log("Logout error", err);
    }
}



//admin refresh api
export const refreshTokeApi = async () => {
  const res = await fetch(`${BASE_URL}/v1/admin/refresh`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Refresh failed");
  }

  return res.json();
};
