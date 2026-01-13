'use client'
import React, { useState } from 'react'
import { optimizeCutting } from '../../../services/optimizer'
import { RawSlabViewer } from '../../../components/RawSlabViewer'
import { CutSlabViewer } from '../../../components/CutSlabViewer'
import { OptimizationResult } from '../../../types/optimizer'

const New = () => {
  /* -------------------- STATE -------------------- */
  const [unit, setUnit] = useState<'cm' | 'mm' | 'inch'>('cm')

  const [slab, setSlab] = useState({
    width: 0,
    height: 0,
    quantity: 1
  })

  const [piece, setPiece] = useState({
    width: 0,
    height: 0,
    quantity: 1,
    allowRotation: true
  })

  const [kerf, setKerf] = useState(0.5)

  const [grainSameDirection, setGrainSameDirection] = useState(true)
  const [allowRotation, setAllowRotation] = useState(true)

  const [optimizationGoal, setOptimizationGoal] =
    useState<'MINIMIZE_WASTE' | 'MINIMIZE_SLABS'>('MINIMIZE_WASTE')

  const [result, setResult] = useState<OptimizationResult | null>(null)

  /* -------------------- HANDLER -------------------- */
  const runOptimization = () => {
    const output = optimizeCutting(
      slab,
      [piece],
      {
        unit,
        kerf,
        allowRotation,
        grainDirection: grainSameDirection
          ? 'SAME_DIRECTION'
          : 'ROTATION_ALLOWED',
        optimizationGoal
      }
    )

    setResult(output)
  }

  /* -------------------- UI -------------------- */
  return (
    <div className='grid grid-cols-8 h-screen p-5 space-x-10 overflow-y-auto'>
      {/* LEFT PANEL */}
      <div className='space-y-2 col-span-2'>
        <h3 className='text-lg font-bold'>Create new project</h3>

        {/* Units */}
        <div className='border rounded-md px-5 py-2 space-y-2'>
          <h3 className='border-b-2 pb-2 font-semibold'>Units</h3>
          <div className='flex space-x-5'>
            {['cm', 'mm', 'inch'].map(u => (
              <div key={u}>
                <input
                  type='radio'
                  name='units'
                  checked={unit === u}
                  onChange={() => setUnit(u as any)}
                />
                <label> {u} </label>
              </div>
            ))}
          </div>
        </div>

        {/* Slabs */}
        <div className='border rounded-md px-5 py-2 space-y-2'>
          <h3 className='border-b-2 pb-2 font-semibold'>Slabs</h3>
          <div className='flex text-center'>
            {['width', 'height', 'quantity'].map(key => (
              <div key={key}>
                <input
                  type='number'
                  className='bg-[#1B795D]/10 rounded-md p-2 w-20'
                  onChange={e =>
                    setSlab({ ...slab, [key]: Number(e.target.value) })
                  }
                />
                <label> {key} </label>
              </div>
            ))}
          </div>
        </div>

        {/* Required pieces */}
        <div className='border rounded-md px-5 py-2 space-y-2'>
          <h3 className='border-b-2 pb-2 font-semibold'>Required pieces</h3>
          <div className='flex space-x-5 text-center'>
            {['width', 'height', 'quantity'].map(key => (
              <div key={key}>
                <input
                  type='number'
                  className='bg-[#1B795D]/10 rounded-md p-2 w-20'
                  onChange={e =>
                    setPiece({ ...piece, [key]: Number(e.target.value) })
                  }
                />
                <label> {key} </label>
              </div>
            ))}
          </div>
        </div>

        {/* Cutting settings */}
        <div className='border rounded-md px-5 py-2 space-y-2'>
          <h3 className='border-b-2 pb-2 font-semibold'>Cutting settings</h3>

          <div className='flex justify-between items-center'>
            <label>Saw Kerf</label>
            <input
              type='number'
              className='bg-[#1B795D]/10 rounded-md p-2 w-20'
              value={kerf}
              onChange={e => setKerf(Number(e.target.value))}
            />
          </div>

          <div>
            <input
              type='checkbox'
              checked={grainSameDirection}
              onChange={() => setGrainSameDirection(!grainSameDirection)}
            />
            <label> Same direction </label>
          </div>

          <div>
            <input
              type='checkbox'
              checked={allowRotation}
              onChange={() => setAllowRotation(!allowRotation)}
            />
            <label> Allow piece rotation </label>
          </div>

          <div>
            <input
              type='checkbox'
              checked={optimizationGoal === 'MINIMIZE_WASTE'}
              onChange={() => setOptimizationGoal('MINIMIZE_WASTE')}
            />
            <label> Minimize material waste </label>
          </div>

          <div>
            <input
              type='checkbox'
              checked={optimizationGoal === 'MINIMIZE_SLABS'}
              onChange={() => setOptimizationGoal('MINIMIZE_SLABS')}
            />
            <label> Minimize number of slabs </label>
          </div>

          <button
            onClick={runOptimization}
            className='w-full py-2 bg-[#1B795D] text-white rounded-md'
          >
            Optimize
          </button>
        </div>
      </div>

      {/* MIDDLE: BEFORE / AFTER */}
      <div className='col-span-4 space-y-10'>
        {slab.width > 0 && slab.height > 0 && (
          <>
            <div>
              <h3 className='font-bold mb-2'>Before Cutting</h3>
              <RawSlabViewer
                widthMM={slab.width}
                heightMM={slab.height}
              />
            </div>

            {result && (
              <div>
                <h3 className='font-bold mb-2'>After Cutting</h3>
                <CutSlabViewer
                  slabWidthMM={slab.width}
                  slabHeightMM={slab.height}
                  slabIndex={0}
                  pieces={result.placedPieces}
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* RIGHT: SUMMARY */}
      <div className='col-span-2'>
        <div className='bg-[#1B795D] rounded-md text-white p-5 space-y-5'>
          <h3 className='text-xl font-bold'>Optimization Summary</h3>

          {result && (
            <>
              <div className='flex justify-between'>
                <span>Total slabs used</span>
                <span>{result.slabsUsed}</span>
              </div>
              <div className='flex justify-between'>
                <span>Total waste</span>
                <span>{Math.round(result.totalWasteAreaMM2)}</span>
              </div>
              <div className='flex justify-between'>
                <span>Waste %</span>
                <span>{result.wastePercentage.toFixed(2)}%</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default New
