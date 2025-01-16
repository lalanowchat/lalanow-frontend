import Header from '../components/Header'
import { Link } from 'react-router-dom'

export default function Home() {
  
    return (
        <>
            <Header title="LALA Now"/>
            <div className="flex flex-col items-start justify-center min-h-screen p-4">
                <h1 className="text-3xl font-bold mb-8 text-left w-2/3">Welcome to LALA Now Project</h1>
                <div className="flex flex-col w-2/3 gap-4 ml-0 mr-auto">
                    <Link 
                        to="/need-help"
                        className="w-full p-4 text-xl bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-left"
                    >
                        I need help (resources)
                    </Link>
                    <Link
                        to="/want-to-help" 
                        className="w-full p-4 text-xl bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-left"
                    >
                        I want to help (volunteering & donation locations)
                    </Link>
                    
                </div>
            </div>
        </>


    );
  }
  