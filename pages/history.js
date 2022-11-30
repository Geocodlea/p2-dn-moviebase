import Layout from "components/Layout";
import {
  Center,
  Text,
  Heading,
  Progress,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import Link from "next/link";
import useSWR from "swr";
import dateFormat from "utils/dateFormat";
import HistoryForm from "components/HistoryForm";
import Header from "components/Header";

export default function History() {
  const { data, error } = useSWR(`/api/history`);

  if (error) {
    return (
      <Text color="red">Error fetching movies: {JSON.stringify(error)}</Text>
    );
  }
  if (!data) {
    return <Progress size="lg" isIndeterminate />;
  }

  return (
    <Layout title="History">
      <Header title="History" />
      <Center>
        {data.length > 0 && (
          <TableContainer w="90%">
            <Table variant="striped" colorScheme="blue">
              <Thead>
                <Tr>
                  <Th>No.</Th>
                  <Th>Title</Th>
                  <Th>Watched</Th>
                  <Th>Location</Th>
                  <Th>Rating</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map(({ id, title, date, location, rating }, index) => (
                  <Tr key={id}>
                    <Td textAlign="center">{index + 1}</Td>
                    <Td>
                      <Link href={`/movies/${id}`} passHref legacyBehavior>
                        <Text as="a">{title}</Text>
                      </Link>
                    </Td>
                    <Td>{dateFormat(date)}</Td>
                    <Td>{location}</Td>
                    <Td>{rating}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Center>
      <HistoryForm />
    </Layout>
  );
}
