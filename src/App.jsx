// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Heading,
//   Input,
//   Button,
//   Checkbox,
//   HStack,
//   VStack,
//   Flex,
//   Text,
//   useToast,
//   IconButton,
// } from "@chakra-ui/react";
// import { StarIcon } from "@chakra-ui/icons";

// const TodoApp = () => {
//   const [todos, setTodos] = useState([]);
//   const [inputValue, setInputValue] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [editingId, setEditingId] = useState(null);
//   const [editValue, setEditValue] = useState("");
//   const toast = useToast();

//   useEffect(() => {
//     const savedTodos = localStorage.getItem("todos");
//     if (savedTodos) {
//       setTodos(JSON.parse(savedTodos));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("todos", JSON.stringify(todos));
//   }, [todos]);

//   const addTodo = () => {
//     if (inputValue.trim() === "") {
//       toast({
//         title: "Error",
//         description: "Todo cannot be empty",
//         status: "error",
//         duration: 2000,
//         isClosable: true,
//       });
//       return;
//     }

//     const newTodo = {
//       id: Date.now(),
//       text: inputValue,
//       completed: false,
//       bookmarked: false,
//     };

//     setTodos([...todos, newTodo]);
//     setInputValue("");
//   };

//   const toggleTodo = (id) => {
//     setTodos(
//       todos.map((todo) =>
//         todo.id === id ? { ...todo, completed: !todo.completed } : todo
//       )
//     );
//   };

//   const toggleBookmark = (id) => {
//     setTodos(
//       todos.map((todo) =>
//         todo.id === id ? { ...todo, bookmarked: !todo.bookmarked } : todo
//       )
//     );
//   };

//   const deleteTodo = (id) => {
//     setTodos((prevTodos) =>
//       prevTodos.map((todo) =>
//         todo.id === id ? { ...todo, deleting: true } : todo
//       )
//     );

//     setTimeout(() => {
//       setTodos(todos.filter((todo) => todo.id !== id));
//     }, 1000);
//   };

//   const startEditing = (id, text) => {
//     setEditingId(id);
//     setEditValue(text);
//   };

//   const saveEdit = (id) => {
//     setTodos(
//       todos.map((todo) =>
//         todo.id === id ? { ...todo, text: editValue } : todo
//       )
//     );
//     setEditingId(null);
//     setEditValue("");
//   };

//   const filteredTodos = todos.filter((todo) =>
//     todo.text.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <Box maxWidth="800px" margin="0 auto" p={4}>
//       <Flex justifyContent="space-between" alignItems="center" mb={8}>
//         <Heading as="h1" size="xl" textAlign={["center", "left"]}>
//           Todo App
//         </Heading>
//         <HStack spacing={2}>
//           <Input
//             placeholder="Search todos..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             width="auto"
//           />
//           <Button colorScheme="blue" onClick={() => setSearchTerm("")}>
//             Clear
//           </Button>
//         </HStack>
//       </Flex>

//       <HStack mb={4}>
//         <Input
//           placeholder="Add a new todo..."
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           onKeyPress={(e) => e.key === "Enter" && addTodo()}
//         />
//         <Button colorScheme="teal" onClick={addTodo}>
//           Add
//         </Button>
//       </HStack>

//       <VStack spacing={3} align="stretch">
//         {filteredTodos.length === 0 ? (
//           <Text textAlign="center" py={4}>
//             {searchTerm ? "No matching todos found" : "No todos yet. Add one!"}
//           </Text>
//         ) : (
//           filteredTodos.map((todo) => (
//             <Box
//               key={todo.id}
//               p={4}
//               borderWidth="1px"
//               borderRadius="md"
//               opacity={todo.deleting ? 0.6 : 1}
//               transition="opacity 0.3s"
//               bg={todo.bookmarked ? "yellow.50" : "transparent"}
//             >
//               <Flex justifyContent="space-between" alignItems="center">
//                 {editingId === todo.id ? (
//                   <HStack flex={1}>
//                     <Input
//                       value={editValue}
//                       onChange={(e) => setEditValue(e.target.value)}
//                       onKeyPress={(e) => e.key === "Enter" && saveEdit(todo.id)}
//                     />
//                     <Button size="sm" onClick={() => saveEdit(todo.id)}>
//                       Save
//                     </Button>
//                     <Button
//                       size="sm"
//                       variant="outline"
//                       onClick={() => setEditingId(null)}
//                     >
//                       Cancel
//                     </Button>
//                   </HStack>
//                 ) : (
//                   <>
//                     <HStack flex={1} alignItems="center" spacing={4}>
//                       <Checkbox
//                         isChecked={todo.completed}
//                         onChange={() => toggleTodo(todo.id)}
//                         size="lg"
//                         borderColor="gray.300"
//                       />
//                       <Text
//                         as={todo.completed ? "del" : "span"}
//                         color={todo.completed ? "gray.500" : "current"}
//                         fontSize="lg"
//                         lineHeight="normal"
//                         verticalAlign="middle"
//                       >
//                         {todo.text}
//                       </Text>
//                     </HStack>
//                     <HStack spacing={2}>
//                       <Button
//                         size="sm"
//                         colorScheme="blue"
//                         onClick={() => startEditing(todo.id, todo.text)}
//                       >
//                         Edit
//                       </Button>
//                       <Button
//                         size="sm"
//                         colorScheme="red"
//                         onClick={() => deleteTodo(todo.id)}
//                         isLoading={todo.deleting}
//                       >
//                         Delete
//                       </Button>

//                       <IconButton
//                         size="sm"
//                         colorScheme={todo.bookmarked ? "yellow" : "gray"}
//                         icon={<StarIcon />}
//                         onClick={() => toggleBookmark(todo.id)}
//                         aria-label={
//                           todo.bookmarked ? "Remove bookmark" : "Add bookmark"
//                         }
//                       />
//                     </HStack>
//                   </>
//                 )}
//               </Flex>
//             </Box>
//           ))
//         )}
//       </VStack>
//     </Box>
//   );
// };

// export default TodoApp;


































import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Input,
  Button,
  Checkbox,
  HStack,
  VStack,
  Flex,
  Text,
  useToast,
  IconButton,
  Badge,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { StarIcon, EditIcon, DeleteIcon, AddIcon } from "@chakra-ui/icons";
import { MdAssignment, MdNotifications, MdSearch } from "react-icons/md";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const toast = useToast();

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim() === "") {
      toast({
        title: "Error",
        description: "Todo cannot be empty",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
      bookmarked: false,
      edited: false,
    };

    setTodos([newTodo, ...todos]);
    setInputValue("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const toggleBookmark = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, bookmarked: !todo.bookmarked } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, deleting: true } : todo
      )
    );

    setTimeout(() => {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }, 1000);
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditValue(text);
  };

  const saveEdit = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editValue, edited: true } : todo
      )
    );
    setEditingId(null);
    setEditValue("");
  };

  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Flex direction="column" minHeight="100vh">
      <Box flex="1" maxW="800px" w="100%" mx="auto" px={4} py={4}>
        <Flex justify="space-between" align="center" mb={6}>
          <Heading as="h1" size="xl" textAlign={["center", "left"]}>
            Tasks
          </Heading>

          <Flex align="right" gap={4}>
            <InputGroup w="250px">
              <InputLeftElement pointerEvents="none">
                <MdSearch color="gray" />
              </InputLeftElement>
              <Input
                size="md"
                placeholder="Search todos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Flex>
        </Flex>

        <VStack spacing={3} align="stretch">
          {filteredTodos.length === 0 ? (
            <Text textAlign="center" py={4}>
              {searchTerm
                ? "No matching todos found"
                : "No todos yet. Add one!"}
            </Text>
          ) : (
            filteredTodos.map((todo) => (
              <Box
                key={todo.id}
                p={3}
                borderWidth="1px"
                borderRadius="md"
                opacity={todo.deleting ? 0.6 : 1}
                transition="opacity 0.3s"
                bg={todo.bookmarked ? "yellow.50" : "white"}
              >
                <Flex justifyContent="space-between" alignItems="center">
                  {editingId === todo.id ? (
                    <HStack flex={1}>
                      <Input
                        size="md"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && saveEdit(todo.id)
                        }
                      />
                      <Button size="sm" onClick={() => saveEdit(todo.id)}>
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </Button>
                    </HStack>
                  ) : (
                    <>
                      <HStack flex={1} alignItems="center" spacing={3}>
                       
                        {/* <MdAssignment size={20} color="gray" /> */}
                        <Checkbox
                          isChecked={todo.completed}
                          onChange={() => toggleTodo(todo.id)}
                          size="md"
                          borderColor="gray.300"
                        />
                        <Text
                          as={todo.completed ? "del" : "span"}
                          color={todo.completed ? "gray.500" : "current"}
                          fontSize="md"
                        >
                          {todo.text}
                        </Text>
                      </HStack>
                      <HStack spacing={2}>
                        <IconButton
                          size="md"
                          colorScheme="blue"
                          icon={<EditIcon />}
                          onClick={() => startEditing(todo.id, todo.text)}
                          aria-label="Edit"
                        />
                        <IconButton
                          size="md"
                          colorScheme="red"
                          icon={<DeleteIcon />}
                          onClick={() => deleteTodo(todo.id)}
                          isLoading={todo.deleting}
                          aria-label="Delete"
                        />
                        <IconButton
                          size="md"
                          colorScheme={todo.bookmarked ? "yellow" : "gray"}
                          icon={<StarIcon />}
                          onClick={() => toggleBookmark(todo.id)}
                          aria-label={
                            todo.bookmarked ? "Remove bookmark" : "Add bookmark"
                          }
                        />
                        {todo.edited && (
                          <Badge colorScheme="gray" fontSize="0.7em">
                            edited
                          </Badge>
                        )}
                      </HStack>
                    </>
                  )}
                </Flex>
              </Box>
            ))
          )}
        </VStack>
      </Box>

      
      <Box
        borderTop="1px solid"
        borderColor="gray.200"
        bg="white"
        position="sticky"
        bottom="0"
        width="100%"
      >
        <VStack
          spacing={3}
          align="stretch"
          w="100%"
          maxW="800px"
          mx="auto"
          px={4}
          py={4}
        >
          <HStack
            spacing={2}
            w="100%"
            flexDir={{ base: "column", sm: "row" }}
            align="stretch"
          >
            <Input
              size="lg"
              placeholder="Add a new todo..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addTodo()}
              w="100%"
            />
            <IconButton
              size="lg"
              colorScheme="teal"
              icon={<AddIcon />}
              onClick={addTodo}
              aria-label="Add todo"
              w={{ base: "100%", sm: "auto" }}
              mt={{ base: 2, sm: 0 }}
            />
          </HStack>
        </VStack>
      </Box>
    </Flex>
  );
};

export default TodoApp;
