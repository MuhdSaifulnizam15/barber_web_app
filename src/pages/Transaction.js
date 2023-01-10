import BarChart from 'components/BarChart'
import LineChart from 'components/LineChart'
import DoughnutChart from 'components/DoughnutChart'
import Footer from '../components/Footer'
import Navbar from 'components/Navbar'
import Header from 'components/Header'

const Transaction = () => {
  return (
    <div>
      <main>
        <Navbar current="Transactions" />
        <Header title="Transaction" />

        <div className="mx-auto max-w-7xl overflow-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0 overflow-auto">
            <div className="mt-10 sm:mt-0 overflow-auto">
              <div className="md:grid md:gap-6">
                <LineChart />
                <BarChart />
                <DoughnutChart />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  )
}

export default Transaction;