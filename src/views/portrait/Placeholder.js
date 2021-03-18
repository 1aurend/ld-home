/** @jsxImportSource theme-ui */
import MobileCursor from '../RAFCursor'
import peirce from '../../assets/texts/fixationOfBelief'


export default function Placeholder() {
  return (
    <main
      sx={{
        width:'100%',
        height:'100vh',
        bg:'DarkPurple1',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        p:'10%',
        cursor:'none'
      }}>
      <div
        id='isolate'
        sx={{
          height:'100vh',
          width:'100vw',
          isolation:'isolate',
          zIndex:1,
          position:'absolute'
        }}>
        <div
          id='bg-text'
          sx={{
            height:`100vh`,
            width:'100%',
            fontFamily:'heading',
            fontSize:'teensy',
            zIndex:0,
            overflow:'hidden',
            position:'absolute',
            opacity:1,
            bg:'none',
            color:'DarkPurple1'
          }}>
          {peirce}
        </div>
        <MobileCursor showInfo={false}/>
      </div>
      <div
        sx={{
          zIndex:10
        }}>
        <h2
          sx={{
            fontFamily:'heading',
            fontSize:'3vh',
            fontWeight:'heading',
            color:'Teal1',
          }}>
          Mobile version coming soon! Please visit on a computer or expand your window for the full experience.
        </h2>
      </div>
    </main>
  )
}
