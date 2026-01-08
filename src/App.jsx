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
//   Badge,
//   InputGroup,
//   InputLeftElement,
//   InputRightElement,
//   useColorMode,
//   useColorModeValue,
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
// } from "@chakra-ui/react";
// import {
//   StarIcon,
//   EditIcon,
//   DeleteIcon,
//   AddIcon,
//   SunIcon,
//   MoonIcon,
// } from "@chakra-ui/icons";
// import { MdSearch, MdMoreVert } from "react-icons/md";
// import "./App.css";
// import "./index.css";

// const TodoApp = () => {
//   const [todos, setTodos] = useState([]);
//   const [inputValue, setInputValue] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [editingId, setEditingId] = useState(null);
//   const [editValue, setEditValue] = useState("");
//   const toast = useToast();
//   const { colorMode, toggleColorMode } = useColorMode();
//   const bgColor = useColorModeValue("white", "gray.800");
//   const todoBg = useColorModeValue("white", "gray.700");

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
//       edited: false,
//     };

//     setTodos([newTodo, ...todos]);
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
//       setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
//     }, 200);
//   };

//   const startEditing = (id, text) => {
//     setEditingId(id);
//     setEditValue(text);
//   };

//   const saveEdit = (id) => {
//     setTodos(
//       todos.map((todo) =>
//         todo.id === id ? { ...todo, text: editValue, edited: true } : todo
//       )
//     );
//     setEditingId(null);
//     setEditValue("");
//   };

//   const filteredTodos = todos.filter((todo) =>
//     todo.text.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <Flex direction="column" minHeight="90vh" overflow="hidden" bg={bgColor}>
//       <Box flex="1" maxW="800px" w="100%" mx="auto" px={4} py={4}>
//         <Flex
//           justify="space-between"
//           align="center"
//           mb={6}
//           flexWrap="wrap"
//           gap={4}
//         >
//           <Heading
//             as="h1"
//             size="xl"
//             textAlign={{ base: "center", sm: "left" }}
//             w={{ base: "100%", sm: "auto" }}
//           >
//             Tasks
//           </Heading>

//           <Flex
//             align="center"
//             gap={3}
//             w={{ base: "100%", sm: "auto" }}
//             justify={{ base: "center", sm: "flex-end" }}
//           >
//             <InputGroup w={{ base: "80%", sm: "200px" }}>
//               <InputLeftElement pointerEvents="none">
//                 <MdSearch color="gray" />
//               </InputLeftElement>
//               <Input
//                 size="md"
//                 borderRadius="2xl"
//                 placeholder="Search"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </InputGroup>

//             <IconButton
//               size="md"
//               onClick={toggleColorMode}
//               icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
//               aria-label="Toggle dark mode"
//             />
//           </Flex>
//         </Flex>

//         <VStack spacing={3} align="stretch" h="60vh" overflowY="auto" pr={2}>
//           {filteredTodos.length === 0 ? (
//             <Text
//               display="flex"
//               alignItems={"center"}
//               justifyContent={"center"}
//               minHeight="60vh"
//               // backgroundColor={"red"}
//               textAlign="center"
//               py={4}
//             >
//               {searchTerm
//                 ? "No matching todos found"
//                 : "No todos yet. Add one!"}
//             </Text>
//           ) : (
//             filteredTodos.map((todo) => (
//               <Box
//                 key={todo.id}
//                 p={3}
//                 borderWidth="1px"
//                 borderRadius="md"
//                 opacity={todo.deleting ? 0.6 : 1}
//                 transition="opacity 0.3s"
//                 bg={todo.bookmarked ? "yellow.100" : todoBg}
//               >
//                 <Flex justifyContent="space-between" alignItems="center">
//                   {editingId === todo.id ? (
//                     <HStack flex={1}>
//                       <Input
//                         size="md"
//                         value={editValue}
//                         onChange={(e) => setEditValue(e.target.value)}
//                         onKeyPress={(e) =>
//                           e.key === "Enter" && saveEdit(todo.id)
//                         }
//                       />
//                       <Button size="sm" onClick={() => saveEdit(todo.id)}>
//                         Save
//                       </Button>
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         onClick={() => setEditingId(null)}
//                       >
//                         Cancel
//                       </Button>
//                     </HStack>
//                   ) : (
//                     <>
//                       <HStack flex={1} alignItems="center" spacing={3}>
//                         <Checkbox
//                           isChecked={todo.completed}
//                           onChange={() => toggleTodo(todo.id)}
//                           size="md"
//                           borderColor="gray.300"
//                         />
//                         <Text
//                           as={todo.completed ? "del" : "span"}
//                           color={todo.completed ? "gray.500" : "current"}
//                           fontSize="md"
//                         >
//                           {todo.text}
//                         </Text>
//                       </HStack>

//                       <HStack
//                         spacing={2}
//                         display={{ base: "none", md: "flex" }}
//                       >
//                         <IconButton
//                           size="md"
//                           colorScheme="blue"
//                           icon={<EditIcon />}
//                           onClick={() => startEditing(todo.id, todo.text)}
//                           aria-label="Edit"
//                         />
//                         <IconButton
//                           size="md"
//                           colorScheme="red"
//                           icon={<DeleteIcon />}
//                           onClick={() => deleteTodo(todo.id)}
//                           isLoading={todo.deleting}
//                           aria-label="Delete"
//                         />
//                         <IconButton
//                           size="md"
//                           colorScheme={todo.bookmarked ? "yellow" : "gray"}
//                           icon={<StarIcon />}
//                           onClick={() => toggleBookmark(todo.id)}
//                           aria-label={
//                             todo.bookmarked ? "Remove bookmark" : "Add bookmark"
//                           }
//                         />
//                         {todo.edited && (
//                           <Badge colorScheme="gray" fontSize="0.7em">
//                             edited
//                           </Badge>
//                         )}
//                       </HStack>

//                       <Menu>
//                         <MenuButton
//                           as={IconButton}
//                           icon={<MdMoreVert />}
//                           variant="outline"
//                           display={{ base: "flex", md: "none" }}
//                           aria-label="Options"
//                         />
//                         <MenuList>
//                           <MenuItem
//                             icon={<EditIcon />}
//                             onClick={() => startEditing(todo.id, todo.text)}
//                           >
//                             Edit
//                           </MenuItem>
//                           <MenuItem
//                             icon={<DeleteIcon />}
//                             onClick={() => deleteTodo(todo.id)}
//                           >
//                             Delete
//                           </MenuItem>
//                           <MenuItem
//                             icon={<StarIcon />}
//                             onClick={() => toggleBookmark(todo.id)}
//                           >
//                             {todo.bookmarked
//                               ? "Remove Bookmark"
//                               : "Add Bookmark"}
//                           </MenuItem>
//                           {todo.edited && (
//                             <MenuItem isDisabled>Edited</MenuItem>
//                           )}
//                         </MenuList>
//                       </Menu>
//                     </>
//                   )}
//                 </Flex>
//               </Box>
//             ))
//           )}
//         </VStack>
//       </Box>

//       <Box
//         borderTop="1px solid"
//         borderColor="gray.200"
//         bg={bgColor}
//         position="sticky"
//         bottom="0"
//         width="100%"
//       >
//         <VStack
//           spacing={3}
//           align="stretch"
//           w="100%"
//           maxW="800px"
//           mx="auto"
//           px={4}
//           py={4}
//         >
//           <InputGroup size="lg">
//             <Input
//               placeholder="Add a new todo..."
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//               onKeyPress={(e) => e.key === "Enter" && addTodo()}
//             />
//             <InputRightElement>
//               <IconButton
//                 size="sm"
//                 colorScheme="teal"
//                 icon={<AddIcon />}
//                 onClick={addTodo}
//                 aria-label="Add todo"
//               />
//             </InputRightElement>
//           </InputGroup>
//         </VStack>
//       </Box>
//     </Flex>
//   );
// };

// export default TodoApp;

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




import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

function App() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!captcha) {
      alert("Please verify reCAPTCHA");
      return;
    }

    alert(`Login Successful!\nName: ${name}`);
  };

  return (
    <div className="container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <ReCAPTCHA
          sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
          onChange={(value) => setCaptcha(value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default App;

