function NoPage() {
  return (
    <div className="flex flex-row justify-center">
      <div className="h-[77vh] flex flex-col justify-center self-center w-[50vh]">
        <p className="font-thin text-xs text-gray-500 text-center mr-[4em]">
          Wrong page. Try again with different terms.
        </p>
        <img src="/giphy.gif" alt="coffe crying" />
      </div>
    </div>
  );
}

export default NoPage;
