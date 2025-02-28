import { motion } from "framer-motion";

const SuccessDialog = () => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="py-8 text-center"
      >
        <div className="mx-auto h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-green-500"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h3 className="text-xl font-medium mb-2">Claim Successful!</h3>
        <p className="text-muted-foreground">
          Your 314 π tokens will be transferred shortly.
        </p>
      </motion.div>
    </div>
  );
};

export default SuccessDialog;
