import { Box, Icon } from "@chakra-ui/react";
import { FaCoins, FaWallet } from "react-icons/fa";
import { keyframes } from "@emotion/react";

const coins = Array.from({ length: 12 });
const wallets = Array.from({ length: 5 });

const fallAnimation = keyframes`
  0% {
    transform: translateY(-40px) rotate(0deg);
    opacity: 0;
  }

  10% {
    opacity: 0.25;
  }

  100% {
    transform: translateY(110vh) rotate(360deg);
    opacity: 0;
  }
`;

export default function FinanceBackground() {
  return (
    <Box
      position="absolute"
      inset="0"
      overflow="hidden"
      zIndex="0"
      pointerEvents="none">
      {/* Coins */}
      {coins.map((_, i) => (
        <Icon
          key={`coin-${i}`}
          as={FaCoins}
          position="absolute"
          top="-40px"
          left={`${Math.random() * 100}%`}
          boxSize="28px"
          color="yellow.300"
          opacity={0.15}
          animation={`${fallAnimation} ${6 + Math.random() * 6}s linear infinite`}
          animationDelay={`${Math.random() * 6}s`}
        />
      ))}

      {/* Wallets */}
      {wallets.map((_, i) => (
        <Icon
          key={`wallet-${i}`}
          as={FaWallet}
          position="absolute"
          top="-60px"
          left={`${Math.random() * 100}%`}
          boxSize="40px"
          color="teal.400"
          opacity={0.12}
          animation={`${fallAnimation} ${10 + Math.random() * 6}s linear infinite`}
          animationDelay={`${Math.random() * 6}s`}
        />
      ))}
    </Box>
  );
}
