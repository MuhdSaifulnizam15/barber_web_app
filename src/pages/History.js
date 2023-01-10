import Navbar from 'components/Navbar'
import Footer from 'components/Footer'
import Header from 'components/Header'

const History = () => {
  return (
    <div>
      <main>
        <Navbar current="History" />
        <Header title="History" />
        <div className="mx-auto max-w-7xl overflow-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0 overflow-auto">
            <div className="mt-10 sm:mt-0 overflow-auto">
              <div className="md:grid md:gap-6"></div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  )
}

export default History;