import System.IO
import Control.Monad

main :: IO ()
main = do
    hSetBuffering stdout NoBuffering -- DO NOT REMOVE
    
    -- Auto-generated code below aims at helping you parse
    -- the standard input according to the problem statement.
    
    loop

loop :: IO ()
loop = do    
    mhs <- forM [0..7] $ \i -> do
        input_line <- getLine
        let mh = read input_line :: Int -- represents the height of one mountain, from 9 to 0. Mountain heights are provided from left to right.
        return (mh, i)
    
    let max_mtn_x = snd $ maximum mhs
    
    -- either:  FIRE (ship is firing its phase cannons) or HOLD (ship is not firing).
    print max_mtn_x
    
    loop