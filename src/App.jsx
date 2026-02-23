import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  VStack,
  Text,
  useToast,
  useColorMode,
  IconButton,
  Button,
  InputGroup,
  InputLeftElement,
  Input,
  useColorModeValue,
  Container,
} from "@chakra-ui/react";
import {
  SunIcon,
  MoonIcon,
  SearchIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import {
  AnimatePresence
} from "framer-motion";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";
import TaskCard from "./components/TaskCard";
import TaskInput from "./components/TaskInput";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [activeSection, setActiveSection] = useState("new task");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const cancelRef = React.useRef();

  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const mainContentBg = useColorModeValue("white", "gray.800");

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      const parsed = JSON.parse(savedTodos);
      const migrated = parsed.map(todo => ({
        ...todo,
        createdAt: todo.createdAt || new Date().toISOString(),
        deleted: todo.deleted || false,
        priority: todo.priority || "Medium"
      }));
      setTodos(migrated);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text, priority) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      bookmarked: false,
      edited: false,
      priority,
      createdAt: new Date().toISOString(),
      deleted: false,
    };
    setTodos([newTodo, ...todos]);
    toast({
      title: "Task added",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "bottom-right",
    });
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
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, deleted: true } : todo
      )
    );
    toast({
      title: "Moved to Trash",
      status: "info",
      duration: 2000,
      isClosable: true,
      position: "bottom-right",
    });
  };

  const restoreTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, deleted: false } : todo
      )
    );
    toast({
      title: "Task restored",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "bottom-right",
    });
  };

  const confirmPermanentDelete = (id) => {
    setTodoToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const permanentlyDeleteTodo = () => {
    setTodos(todos.filter((todo) => todo.id !== todoToDelete));
    setIsDeleteDialogOpen(false);
    setTodoToDelete(null);
    toast({
      title: "Task permanently deleted",
      status: "error",
      duration: 2000,
      isClosable: true,
      position: "bottom-right",
    });
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

  const counters = {
    new: todos.filter(t => !t.deleted).length,
    pending: todos.filter(t => !t.completed && !t.deleted).length,
    completed: todos.filter(t => t.completed && !t.deleted).length,
    bookmarked: todos.filter(t => t.bookmarked && !t.deleted).length,
    trash: todos.filter(t => t.deleted).length,
  };

  const baseFilteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.text
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    switch (activeSection) {
      case "pending":
        return !todo.completed && !todo.deleted;
      case "completed":
        return todo.completed && !todo.deleted;
      case "bookmarked":
        return todo.bookmarked && !todo.deleted;
      case "trash":
        return todo.deleted;
      case "new":
        return !todo.deleted;
      default:
        return !todo.deleted;
    }
  });



  const sortedTodos = [...baseFilteredTodos].sort((a, b) => {
    if (a.deleted !== b.deleted) return a.deleted ? 1 : -1;
    if (a.bookmarked !== b.bookmarked) return a.bookmarked ? -1 : 1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const sectionTitles = {
    new: "All Tasks",
    pending: "Pending Tasks",
    completed: "Completed Tasks",
    bookmarked: "Bookmarked Tasks",
    trash: "Deleted Tasks",
  };

  return (
    <Flex minH="100vh" bg={bgColor} direction={{ base: "column", md: "row" }} overflow="hidden">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} counters={counters} />

      <Box flex="1" h="100vh" overflowY="auto" p={{ base: 4, md: 8 }} position="relative">
        <Container maxW="container.md" h="full" display="flex" flexDirection="column">
          <Flex justify="space-between" align="center" mb={8} flexShrink={0}>
            <Heading size="lg" fontWeight="bold">
              {sectionTitles[activeSection]}
            </Heading>
            <Flex gap={4} align="center">
              <InputGroup size="md" w={{ base: "150px", md: "250px" }}>
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="gray.400" />
                </InputLeftElement>
                <Input
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  borderRadius="full"
                  bg={mainContentBg}
                />
              </InputGroup>
              <IconButton
                variant="ghost"
                onClick={toggleColorMode}
                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                aria-label="Toggle dark mode"
                borderRadius="full"
              />
            </Flex>
          </Flex>

          {activeSection === "new" && (
            <Box mb={6} flexShrink={0}>
              <TaskInput addTodo={addTodo} />
            </Box>
          )}

          <Box flex="1" overflowY="auto" px={1} pb={10}>
            <VStack align="stretch" spacing={3}>
              <AnimatePresence mode="popLayout">
                {sortedTodos.length === 0 ? (
                  <Flex
                    direction="column"
                    align="center"
                    justify="center"
                    py={20}
                    opacity={0.6}
                  >
                    <Text fontSize="lg" fontWeight="medium">
                      {searchTerm ? "No matching tasks found" : "No tasks here"}
                    </Text>
                    <Text fontSize="sm">
                      {activeSection === "trash" ? "Your trash is empty" : "Enjoy your free time!"}
                    </Text>
                  </Flex>
                ) : (
                  sortedTodos.map((todo) => (
                    <TaskCard
                      key={todo.id}
                      todo={todo}
                      toggleTodo={toggleTodo}
                      toggleBookmark={toggleBookmark}
                      deleteTodo={deleteTodo}
                      startEditing={startEditing}
                      editingId={editingId}
                      editValue={editValue}
                      setEditValue={setEditValue}
                      saveEdit={saveEdit}
                      setEditingId={setEditingId}
                      restoreTodo={restoreTodo}
                      permanentlyDeleteTodo={confirmPermanentDelete}
                    />
                  ))
                )}
              </AnimatePresence>
            </VStack>
          </Box>
        </Container>
      </Box>

      <AlertDialog
        isOpen={isDeleteDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent borderRadius="xl">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Task
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this task? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsDeleteDialogOpen(false)}>
                No
              </Button>
              <Button colorScheme="red" onClick={permanentlyDeleteTodo} ml={3}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
};

export default App;

//   Another my tasks APP check both one you can also try this created by khan

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
