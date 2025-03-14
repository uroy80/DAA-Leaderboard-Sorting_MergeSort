"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function Footer() {
  const [open, setOpen] = useState(false)

  return (
    <footer className="mt-16 pb-8 text-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <p className="text-lg font-semibold text-foreground">Prepared by Usham Roy</p>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="px-8">
              About Us
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>About Us</DialogTitle>
              <DialogDescription>Course Project: Data Structures and Algorithms</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <h3 className="font-medium text-primary">Student Details</h3>
                  <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
                    <div className="font-medium">Name:</div>
                    <div className="col-span-2">Usham Roy</div>

                    <div className="font-medium">Register Number:</div>
                    <div className="col-span-2">RA2311003011574</div>

                    <div className="font-medium">Department:</div>
                    <div className="col-span-2">Computing Technologies, SRMIST</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-primary">Faculty</h3>
                  <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
                    <div className="font-medium">Name:</div>
                    <div className="col-span-2">Dr. Nancy P</div>

                    <div className="font-medium">Designation:</div>
                    <div className="col-span-2">Assistant Professor</div>

                    <div className="font-medium">Department:</div>
                    <div className="col-span-2">Computing Technologies, SRMIST</div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </footer>
  )
}

