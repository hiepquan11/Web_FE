export async function Request(Endpoint:string) {
    // query path
    const response = await fetch(Endpoint);

    // if error
    if(!response.ok){
        throw new Error(`Khong the truy cap ${Endpoint}`);
    }
    return response.json();
}