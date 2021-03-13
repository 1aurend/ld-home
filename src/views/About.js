/** @jsxImportSource theme-ui */

export default function About() {
  return (
    <div
      sx={{
        height:'100%',
        width:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'center',
        cursor:'default'
      }}>
      <h3
        sx={{
          fontFamily:'inter',
          color:'Grey',
          m:0,
          fontSize:'tiny',
          textAlign:'justify',
        }}>Credits</h3>
      <p
        sx={{
          mt:'5%',
          mb:0,
          fontSize:'teensy',
          fontWeight:'heading'
        }}>
        Background Texts:
        <ul sx={{mt:'2%', pl:'1em'}}>
          <li sx={{listStyleType:'none', mb:'2%'}}>Charles S. Pierce, <em>The Fixation of Belief</em></li>
          <li sx={{listStyleType:'none'}}>John Dewey, <em>How We Think</em></li>
        </ul>
      </p>
      <p
        sx={{
          mt:'5%',
          fontSize:'teensy',
          fontWeight:'heading'
        }}>
        Animations built with my <a href='https://github.com/1aurend/use-spacetime' target='_blank' rel='noopener noreferrer' sx={{color:'Orange1',cursor:'pointer',textDecoration:'none'}}>use-spacetime</a> hooks which provide a keyframes-based interface for animating complex scroll interactions with <a href='https://www.framer.com/motion/' target='_blank' rel='noopener noreferrer'  sx={{color:'Orange1',cursor:'pointer',textDecoration:'none'}}>framer-motion</a>.
      </p>
      <p
        sx={{
          mt:'5%',
          fontSize:'teensy',
          fontWeight:'heading'
        }}>
        Many thanks to <a href='https://www.philipfahnl.ai' target='_blank' rel='noopener noreferrer'  sx={{color:'Orange1',cursor:'pointer',textDecoration:'none'}}>Phil</a> for input along the way and to <a href='https://thinkeranalytix.org/team/' target='_blank' rel='noopener noreferrer'  sx={{color:'Orange1',cursor:'pointer',textDecoration:'none'}}>Anne</a> for encouragement!
      </p>
    </div>
  )
}
