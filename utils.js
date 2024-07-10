// utils.js
export const generateRandomUser = async () => {
    const randomNameResponse = await fetch('https://api.namefake.com/');
    const randomNameData = await randomNameResponse.json();
    const randomName = randomNameData.name;
  
    const avatarUrl = `https://avatars.dicebear.com/api/personas/${encodeURIComponent(randomName)}.svg`;
  
    return {
      name: randomName,
      avatarUrl,
    };
  };
  