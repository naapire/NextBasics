const getPredictedAge = async (name: string): Promise<{ age: number | null }> => {
  const res = await fetch(`https://api.agify.io?name=${name}`);
  if (!res.ok) throw new Error("Failed to fetch age");
  return res.json();
};

const getPredictedGender = async (name: string): Promise<{ gender: string | null }> => {
  const res = await fetch(`https://api.genderize.io?name=${name}`);
  if (!res.ok) throw new Error("Failed to fetch gender");
  return res.json();
};

const getPredictedNationality = async (name: string): Promise<{ country: { country_id: string }[] }> => {
  const res = await fetch(`https://api.nationalize.io?name=${name}`);
  if (!res.ok) throw new Error("Failed to fetch nationality");
  return res.json();
};

interface Params {
  params: { name: string };
}

async function Prediction({ params }: Params) {
  // Ensure all API calls are awaited correctly
  const [age, gender, nationality] = await Promise.all([
    getPredictedAge(params.name),
    getPredictedGender(params.name),
    getPredictedNationality(params.name),
  ]);

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3 p-4">
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
          Personal Info
        </div>
        <div className="block mt-1 text-lg leading-tight font-medium text-black">
          Age: {age.age ?? "N/A"}
        </div>
        <div className="block mt-1 text-lg leading-tight font-medium text-black">
          Gender: {gender.gender ?? "N/A"}
        </div>
        <div className="block mt-1 text-lg leading-tight font-medium text-black">
          Nationality: {nationality.country[0]?.country_id ?? "N/A"}
        </div>
      </div>
    </div>
  );
}

export default Prediction;
