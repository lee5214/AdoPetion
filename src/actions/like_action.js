const LIKE_PET = "likePet";const likePet = pet => {  return {    type: LIKE_PET,    payload: pet  };};export {LIKE_PET,likePet}