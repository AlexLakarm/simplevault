import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-gray-900 text-center py-4 border-t">
      <p className="text-black dark:text-white">Powered by Next.js and Alyra</p>
      <div className="flex justify-center items-center mt-2">
        <Image 
          src="/images/next.png"
          alt="Next.js Logo" 
          width={100} 
          height={20}
          className="dark:invert"
          priority
        />
      </div>
    </footer>
  );
}