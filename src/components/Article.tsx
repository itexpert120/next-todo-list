import Image from "next/image";

interface TaskProps {
  title: string;
  body: string;
  onDelete: () => void; // Function to handle delete
}

export function Article(props: TaskProps) {
  const handleDelete = () => {
    props.onDelete();
  };
  return (
    <>
      <div className="border rounded-lg p-4">
        <div className="flex flex-row justify-between">
          <h1 className="font-bold text-lg">{props.title}</h1>
          <button type="button" onClick={handleDelete}>
            <Image
              src="/checkbox-check.svg"
              width="24"
              height="24"
              alt="trash"
            />
          </button>
        </div>
        <p className="text-black my-1">{props.body}</p>
      </div>
    </>
  );
}
