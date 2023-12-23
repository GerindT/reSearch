import { Accordion } from "flowbite-react";
function InfoAccordion() {
  return (
    <>
      <Accordion className="max-w-[60%]">
        <Accordion.Panel>
          <Accordion.Title>What is ResearchGay?</Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
              minus placeat libero molestiae totam, pariatur provident, quos
              molestias possimus dicta necessitatibus. Veniam in consectetur
              quae modi. Recusandae laborum quas iste.
            </p>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>
            Is there a ResearchGay file available?
          </Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima
              accusamus voluptates sunt, omnis iure unde consequuntur eos, rerum
              esse modi quod explicabo quisquam facilis deserunt doloremque
              nemo. Impedit, vitae voluptatem.
            </p>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>
            What are the differences between ReserchGay and ResearchGate?
          </Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Cupiditate, consequatur est? Maiores dolores unde suscipit, fuga
              laudantium dignissimos voluptatem similique assumenda nesciunt
              fugit quos animi alias aperiam ipsa dicta beatae.
            </p>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </>
  );
}

export default InfoAccordion;
