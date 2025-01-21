import { useState, useEffect } from "react"
import axiosInstance from "../api/axios"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Header from "@/components/Header"
import { useTranslation } from 'react-i18next';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from "@/components/ui/form"
import MapComponent from '@/components/MapComponent';

export default function NeedHelp() {
  const [categories, setCategories] = useState([])
  const [zipCode, setZipCode] = useState('')
  const [chosenCategory, setChosenCategory] = useState('')
  const [resources, setResources] = useState([])
  const { t } = useTranslation();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ categoriesRes] = await Promise.all([
          axiosInstance.get('/resources/need-help-categories')
        ])
        setCategories(categoriesRes.data)
      } catch (error) {
        console.error('Error fetching dropdown data:', error)
      }
    }

    fetchData()
  }, [])

  const formSchema = z.object({
    category: z.string().min(1, {
      message: "Please select a category",
    }),
    zipCode: z.string()
      .max(5, "Zip code must be 5 digits")
      .regex(/^\d+$/, "Must contain only numbers")
      .optional()
      .or(z.literal(''))
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      zipCode: ""
    }
  })

  const getResources = async () => {
    const response = await axiosInstance.get(
      `/resources/need-help/by-zip?category=${chosenCategory}&zipcode=${zipCode}`)
    setResources(response.data.resources)
  }

  return (
    <>
      <Header title={`LaHelpNow > ${t("needhelp.need_help")}`} />
        <div className="p-4">
        <p className="text-muted-foreground mt-12 mb-4">
        {t('needhelp.this_search_draws')} <a href="https://docs.google.com/spreadsheets/u/1/d/1KMk34XY5dsvVJjAoD2mQUVHYU_Ib6COz6jcGH5uJWDY/htmlview#" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">{t('needhelp.MALAN_resources_table')}</a>
        </p>
        <div className="flex gap-4  mb-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(getResources)} className="flex gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Help Category</FormLabel>
                    <Select onValueChange={(value) => {
                      setChosenCategory(value);
                      field.onChange(value);
                    }}>
                      <FormControl>
                      {/* Add TailwindCSS class to fix z-index */}
                      <SelectTrigger className="relative z-11 w-[180px]">
                          <SelectValue placeholder={t("needhelp.choose_category")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category, index) => (
                          <SelectItem key={index} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("needhelp.zip_code")} </FormLabel>
                    <FormControl>
                      <Input {...field} onChange={(e) => {
                        setZipCode(e.target.value);
                        field.onChange(e);
                      }} placeholder={t("needhelp.zip_code")} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">
                {t('needhelp.search')} 
              </Button>
            </form>
          </Form>
        </div>
        {/* Add a lower z-index to the map */}
        <div id="map" className="relative z-10">
          <MapComponent resources={resources} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources?.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>{t('needhelp.no_results')}</CardTitle>
                <CardDescription>{t('needhelp.no_resources_found')}</CardDescription>
              </CardHeader>
            </Card>
          ) : (
            resources?.map((resource, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{resource.name}</CardTitle>
                      <CardDescription>{resource.address}</CardDescription>
                    </div>
                    {zipCode && <span className="font-bold text-blue-500">{resource.distance.toFixed(1)} miles</span>}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-line text-left">{resource.providing}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </>
  )
}
