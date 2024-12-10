import { useCommonStore } from "@/stores/commonStore";

const ServerError = () => {
  const error = useCommonStore((state) => state.error);

  return (
    <div className="serverErrorContainer p-4">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Server Error
      </h1>
      {error?.message && (
        <h5 className="mt-2 text-lg font-semibold text-red-500">
          {error.message}
        </h5>
      )}
      {error?.details && (
        <div className="errorContent mt-4">
          <h4 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Stack trace
          </h4>
          <code className="block mt-2 p-2 bg-gray-100 text-sm text-gray-800 rounded">
            {error.details}
          </code>
        </div>
      )}
    </div>
  );
};

export default ServerError;
