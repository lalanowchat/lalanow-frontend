import Header from '../components/Header'
import { Link } from 'react-router-dom'

export default function Home() {
  
    return (
        <>
            <Header title="LaHelpNow"/>
            <div className="flex flex-col items-start justify-center min-h-screen p-4">
                <div className="flex flex-row w-100 gap-4 ml-0 mr-auto">
                    <Link 
                        to="/need-help"
                        className="flex-1 p-4 text-xl bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-center"
                    >
                        I need help (resources)
                    </Link>
                    <Link
                        to="/want-to-help" 
                        className="flex-1 p-4 text-xl bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-center"
                    >
                        I want to help (volunteering & donation locations)
                    </Link>
                </div>
            </div>
        </>
    );
  }
  